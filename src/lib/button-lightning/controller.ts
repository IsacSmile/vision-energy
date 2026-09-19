import { VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE } from './shader';

// Constants (Tuned for premium button lightning effect)
export const HUE = 210;
export const INTENSITY = 0.9;
export const SIZE = 1.4;
export const WANDER = 0.6;
export const SPEED = 1.2;

let canvas: HTMLCanvasElement | null = null;
let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;

// Uniform Locations
let iResolutionLoc: WebGLUniformLocation | null = null;
let iTimeLoc: WebGLUniformLocation | null = null;
let uHueLoc: WebGLUniformLocation | null = null;
let uXOffsetLoc: WebGLUniformLocation | null = null;
let uSpeedLoc: WebGLUniformLocation | null = null;
let uIntensityLoc: WebGLUniformLocation | null = null;
let uSizeLoc: WebGLUniformLocation | null = null;
let uWanderLoc: WebGLUniformLocation | null = null;
let uEnvLoc: WebGLUniformLocation | null = null;

// Controller State
let activeFxLayer: HTMLElement | null = null;
let activeParentButton: HTMLElement | null = null;
let resizeObserver: ResizeObserver | null = null;

let uCurrent = 0.5;
let uTarget = 0.5;
let uEnv = 0.0;
let isActive = false;
let isDetaching = false;
let startTime = 0;
let animFrameId: number | null = null;
let strikeTimer: NodeJS.Timeout | null = null;
let reStrikeTimer: NodeJS.Timeout | null = null;
let hasWarnedContext = false;
let isVisibilityListenerAttached = false;

function initWebGL(): boolean {
  if (gl && program) return true;

  try {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'pointer-events-none absolute inset-0 w-full h-full rounded-full z-[1]';
      canvas.setAttribute('aria-hidden', 'true');

      canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        stopLoop();
        cleanupCanvasDOM();
        gl = null;
        program = null;
      });
    }

    gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: 'low-power',
    });

    if (!gl) {
      if (!hasWarnedContext) {
        console.warn('ButtonLightning: WebGL context not available. Falling back to CSS glow.');
        hasWarnedContext = true;
      }
      return false;
    }

    const compileShader = (src: string, type: number): WebGLShader | null => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn('ButtonLightning shader error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return false;

    program = gl.createProgram();
    if (!program) return false;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('ButtonLightning link error:', gl.getProgramInfoLog(program));
      return false;
    }

    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    iResolutionLoc = gl.getUniformLocation(program, 'iResolution');
    iTimeLoc = gl.getUniformLocation(program, 'iTime');
    uHueLoc = gl.getUniformLocation(program, 'uHue');
    uXOffsetLoc = gl.getUniformLocation(program, 'uXOffset');
    uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    uIntensityLoc = gl.getUniformLocation(program, 'uIntensity');
    uSizeLoc = gl.getUniformLocation(program, 'uSize');
    uWanderLoc = gl.getUniformLocation(program, 'uWander');
    uEnvLoc = gl.getUniformLocation(program, 'uEnv');

    setupVisibilityListener();
    return true;
  } catch (err) {
    if (!hasWarnedContext) {
      console.warn('ButtonLightning initialization error:', err);
      hasWarnedContext = true;
    }
    return false;
  }
}

function setupVisibilityListener() {
  if (isVisibilityListenerAttached || typeof document === 'undefined') return;
  isVisibilityListenerAttached = true;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopLoop();
    } else if (document.visibilityState === 'visible' && isActive && !isDetaching) {
      runStrikeEnvelopeSequence();
      scheduleNextReStrike();
      startLoop();
    }
  });
}

function resizeCanvasToButton() {
  if (!canvas || !gl || !activeParentButton) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(activeParentButton.clientWidth * dpr);
  const height = Math.round(activeParentButton.clientHeight * dpr);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  }
}

function runStrikeEnvelopeSequence() {
  if (strikeTimer) clearInterval(strikeTimer);
  uEnv = 0.0;
  let elapsed = 0;
  const seqStartTime = performance.now();

  strikeTimer = setInterval(() => {
    elapsed = performance.now() - seqStartTime;

    if (elapsed <= 90) {
      // 0 to 1.25 in 90ms
      uEnv = (elapsed / 90) * 1.25;
    } else if (elapsed <= 330) {
      // Flicker over 240ms (two random dips between 0.5 and 1.1 - WCAG 2.3.1 safe)
      if (Math.random() < 0.5) {
        uEnv = 0.5 + Math.random() * 0.6;
      } else {
        uEnv = 0.7 + Math.random() * 0.4;
      }
    } else {
      // Settle at 0.85
      uEnv = 0.85;
      if (strikeTimer) clearInterval(strikeTimer);
      strikeTimer = null;
    }
  }, 16);
}

function scheduleNextReStrike() {
  if (reStrikeTimer) clearTimeout(reStrikeTimer);
  if (!isActive || isDetaching) return;

  // Re-trigger envelope strike every 1400ms to 2200ms at random interval
  const nextInterval = 1400 + Math.random() * 800;

  reStrikeTimer = setTimeout(() => {
    if (!isActive || isDetaching) return;
    runStrikeEnvelopeSequence();
    scheduleNextReStrike();
  }, nextInterval);
}

function renderLoop() {
  if (!canvas || !gl || !program || !activeFxLayer) {
    stopLoop();
    cleanupCanvasDOM();
    return;
  }

  if (document.visibilityState === 'hidden') {
    animFrameId = requestAnimationFrame(renderLoop);
    return;
  }

  // Smooth position lerp (factor 0.18 per frame)
  uCurrent += (uTarget - uCurrent) * 0.18;

  // Fade out on detach (over ~200ms)
  if (isDetaching) {
    uEnv -= 0.08;
    if (uEnv <= 0.01) {
      uEnv = 0;
      stopLoop();
      cleanupCanvasDOM();
      return;
    }
  }

  resizeCanvasToButton();

  gl.useProgram(program);
  const aspect = canvas.width / canvas.height;
  const xOffset = (1.0 - 2.0 * uCurrent) * aspect;

  const now = performance.now();
  gl.uniform2f(iResolutionLoc, canvas.width, canvas.height);
  gl.uniform1f(iTimeLoc, (now - startTime) / 1000.0);
  gl.uniform1f(uHueLoc, HUE);
  gl.uniform1f(uXOffsetLoc, xOffset);
  gl.uniform1f(uSpeedLoc, SPEED);
  gl.uniform1f(uIntensityLoc, INTENSITY);
  gl.uniform1f(uSizeLoc, SIZE);
  gl.uniform1f(uWanderLoc, WANDER);
  gl.uniform1f(uEnvLoc, uEnv);

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  animFrameId = requestAnimationFrame(renderLoop);
}

function startLoop() {
  if (!animFrameId) {
    startTime = performance.now();
    animFrameId = requestAnimationFrame(renderLoop);
  }
}

function stopLoop() {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
  if (strikeTimer) {
    clearInterval(strikeTimer);
    strikeTimer = null;
  }
  if (reStrikeTimer) {
    clearTimeout(reStrikeTimer);
    reStrikeTimer = null;
  }
}

function cleanupCanvasDOM() {
  stopLoop();
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  activeFxLayer = null;
  activeParentButton = null;
  isActive = false;
  isDetaching = false;
  uEnv = 0;
}

function triggerRadialFlash(fxLayer: HTMLElement, pointerXNorm: number) {
  const flashEl = document.createElement('div');
  flashEl.className =
    'pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 z-[2]';
  flashEl.style.background = `radial-gradient(circle at ${pointerXNorm * 100}% 50%, rgba(11,101,179,0.35), transparent 70%)`;
  flashEl.style.opacity = '0';

  fxLayer.appendChild(flashEl);

  requestAnimationFrame(() => {
    flashEl.style.opacity = '1';
    setTimeout(() => {
      flashEl.style.opacity = '0';
      setTimeout(() => {
        if (flashEl.parentNode) flashEl.parentNode.removeChild(flashEl);
      }, 300);
    }, 140);
  });
}

// PUBLIC CONTROLLER API
export function attach(buttonFxLayer: HTMLElement, pointerXNormalised: number = 0.5) {
  if (!initWebGL()) return;
  if (!canvas) return;

  isActive = true;
  isDetaching = false;
  uTarget = Math.max(0, Math.min(1, pointerXNormalised));
  uCurrent = uTarget;

  // If attached to another layer, cleanup old attachment cleanly
  if (activeFxLayer && activeFxLayer !== buttonFxLayer) {
    cleanupCanvasDOM();
  }

  activeFxLayer = buttonFxLayer;
  activeParentButton = buttonFxLayer.parentElement;

  if (activeParentButton) {
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver(() => resizeCanvasToButton());
    }
    resizeObserver.observe(activeParentButton);
  }

  // Move canvas into new FX layer
  buttonFxLayer.appendChild(canvas);

  // Trigger initial strike sequence, schedule looping re-strikes, and radial flash
  runStrikeEnvelopeSequence();
  scheduleNextReStrike();
  triggerRadialFlash(buttonFxLayer, uTarget);

  startLoop();
}

export function setPointer(xNormalised: number) {
  uTarget = Math.max(0, Math.min(1, xNormalised));
}

export function detach() {
  if (!activeFxLayer || isDetaching) return;
  isDetaching = true;
  isActive = false;

  // Stop re-strikes immediately so no new strike occurs while fading out
  if (reStrikeTimer) {
    clearTimeout(reStrikeTimer);
    reStrikeTimer = null;
  }
}

// Pre-warm WebGL program on idle
export function prewarm() {
  initWebGL();
}
