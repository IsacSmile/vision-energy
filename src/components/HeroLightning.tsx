'use client';

export const LIGHTNING_HUE = 210;
export const LIGHTNING_SPEED = 0.7;
export const LIGHTNING_SIZE = 1;
export const BOLT_POSITION = 0.75;
export const MOBILE_WANDER = 0.5;

export interface HeroLightningProps {
  hue?: number;
  speed?: number;
  intensity?: number;
  boltPosition?: number;
  className?: string;
  opacityClass?: string;
}

export default function HeroLightning(_props: HeroLightningProps) {
  return null;
}
