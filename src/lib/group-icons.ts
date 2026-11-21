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
  FlaskConical,
  Beaker,
  Pipette,
  Gauge,
  Microscope,
  Armchair,
  Snowflake,
  ShieldCheck,
  Sparkles,
  Activity,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

export const GROUP_LABELS: Record<string, string> = {
  LP: 'Lightning Protection',
  ER: 'Earthing & Bonding',
  EB: 'Earthing & Bonding',
  LT: 'Lighting & Signalling',
  CM: 'Cable Management',
  CB: 'Cables & Connectivity',
  CT: 'Conduits & Trunking',
  EL: 'Electrical Equipment',
  EN: 'Energy & Power',
  ME: 'Mechanical & HVAC',
  SG: 'Security, Alarm & Fire',
  HW: 'Hardware & Tools',
  SF: 'Safety Marking & PPE',
  PK: 'Packaging',
  ID: 'Identification & Engraving',
  SP: 'Sports & Fitness Equipment',
  // Laboratory Equipment Groups
  LE: 'General Laboratory Equipment',
  LPE: 'Laboratory PPE & Safety Supplies',
  LG: 'Laboratory Glassware & Plasticware',
  LH: 'Liquid Handling & Sample Preparation',
  LC: 'Laboratory Consumables & Accessories',
  LM: 'Measurement & Monitoring Instruments',
  MO: 'Microscopes & Optical Instruments',
  LF: 'Laboratory Furniture & Storage',
  TS: 'Temperature-Controlled Storage',
  LS: 'Laboratory Safety & Containment Systems',
  WS: 'Water Purification & Sterilization',
  AT: 'Analytical & Industrial Testing Instruments',
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
  SP: Trophy,
  // Laboratory Equipment Icons
  LE: FlaskConical,
  LPE: ShieldAlert,
  LG: Beaker,
  LH: Pipette,
  LC: Boxes,
  LM: Gauge,
  MO: Microscope,
  LF: Armchair,
  TS: Snowflake,
  LS: ShieldCheck,
  WS: Sparkles,
  AT: Activity,
};

export function getGroupIcon(groupPrefix: string): LucideIcon {
  const prefix = (groupPrefix || '').toUpperCase();
  return GROUP_ICONS[prefix] || Boxes;
}

export function getGroupLabel(groupPrefix: string, fallback?: string): string {
  const prefix = (groupPrefix || '').toUpperCase();
  return GROUP_LABELS[prefix] || fallback || groupPrefix;
}
