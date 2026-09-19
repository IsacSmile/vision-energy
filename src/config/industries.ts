// TODO: Map sectors to category codes once the client confirms.

export interface IndustrySector {
  id: string;
  name: string;
  iconName: 'HardHat' | 'Wrench' | 'Flame' | 'Zap' | 'Landmark' | 'Sun';
}

export const INDUSTRIES: IndustrySector[] = [
  {
    id: 'construction',
    name: 'Construction',
    iconName: 'HardHat',
  },
  {
    id: 'mep',
    name: 'MEP',
    iconName: 'Wrench',
  },
  {
    id: 'oil-and-gas',
    name: 'Oil and Gas',
    iconName: 'Flame',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    iconName: 'Zap',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    iconName: 'Landmark',
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy',
    iconName: 'Sun',
  },
];
