import {
  Zap,
  Radio,
  Sun,
  Layers,
  Cable,
  CircleDot,
  Plug,
  BatteryCharging,
  Wrench,
  ShieldAlert,
  Hammer,
  HardHat,
  Package,
  Tag,
  Boxes,
  LucideIcon,
} from 'lucide-react';

export const GROUP_LABELS: Record<string, string> = {
  LP: 'Lightning Protection',
  ER: 'Earthing & Bonding',
  EB: 'Earthing & Bonding',
  LT: 'Lighting & Signalling',
  CM: 'Cable Management',
  CB: 'Cables & Connectivity',
  CT: 'Conduit Systems',
  EL: 'Electrical Equipment',
  EN: 'Energy & Power',
  ME: 'Mechanical & HVAC',
  SG: 'Security, Alarm & Fire',
  HW: 'Hardware & Tools',
  SF: 'Safety Marking & PPE',
  PK: 'Packaging',
  ID: 'Identification & Engraving',
};

export const GROUP_ICONS: Record<string, LucideIcon> = {
  LP: Zap,
  ER: Radio,
  EB: Radio,
  LT: Sun,
  CM: Layers,
  CB: Cable,
  CT: CircleDot,
  EL: Plug,
  EN: BatteryCharging,
  ME: Wrench,
  SG: ShieldAlert,
  HW: Hammer,
  SF: HardHat,
  PK: Package,
  ID: Tag,
};

export function getGroupIcon(groupPrefix: string): LucideIcon {
  const prefix = (groupPrefix || '').toUpperCase();
  return GROUP_ICONS[prefix] || Boxes;
}

export function getGroupLabel(groupPrefix: string, fallback?: string): string {
  const prefix = (groupPrefix || '').toUpperCase();
  return GROUP_LABELS[prefix] || fallback || groupPrefix;
}
