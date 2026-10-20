import React from 'react';

export interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  wander?: number;
  octaves?: number;
  maxDpr?: number;
}

const LightningCentered: React.FC<LightningProps> = () => {
  return null;
};

export default LightningCentered;
