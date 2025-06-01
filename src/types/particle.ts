
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  opacity: number;
  trackingType: string;
  color: string;
  trail: any[];
  energy: number;
}
