export type ExpertiseTabId = 'lightning' | 'earthing' | 'gym' | 'laboratory';

export interface ExpertiseImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  surface?: 'light' | 'dark' | 'photo';
}

export interface StepCardItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: ExpertiseImage;
  iconName?: SafetyIconKey;
}

export interface TableRatingValue {
  type: 'rating';
  count: number;
  tone: 'positive' | 'negative';
  label: string;
}

export type TableCellValue = string | TableRatingValue;

export interface TableColumnGroup {
  label: string;
  colSpan: number;
}

export interface DataTableConfig {
  id: string;
  caption: string;
  columnGroups?: TableColumnGroup[];
  headers: string[];
  rows: TableCellValue[][];
  footnote?: string;
  compact?: boolean;
}

export interface FormulaItem {
  condition?: string;
  expression: string;
}

export interface FormulaBlock {
  title?: string;
  formulas: FormulaItem[];
  notes?: string[];
}

export interface MethodologyBlock {
  id: string;
  title: string;
  paragraphs?: string[];
  formula?: string;
  images?: ExpertiseImage[];
  table?: DataTableConfig;
}

export interface SubTabPanel {
  id: string;
  label: string;
  paragraphs?: string[];
  images?: ExpertiseImage[];
  methodologies?: MethodologyBlock[];
  formulaBlock?: FormulaBlock;
  tables?: DataTableConfig[];
  iconItems?: StepCardItem[];
}

export interface ExpertiseStep {
  id: string;
  stepNumber: number;
  title: string;
  intro?: string;
  paragraphs?: string[];
  cards?: StepCardItem[];
  cardColumns?: 2 | 3;
  checklist?: string[];
  images?: ExpertiseImage[];
  subTabs?: SubTabPanel[];
}

export interface EmptyStateConfig {
  title: string;
  message: string;
  ctaLabel: string;
}

export interface ExpertiseTabConfig {
  id: ExpertiseTabId;
  label: string;
  eyebrow: string;
  heading: string;
  description?: string;
  steps?: ExpertiseStep[];
  emptyState?: EmptyStateConfig;
}

export type SafetyIconKey =
  | 'trees'
  | 'axe'
  | 'building'
  | 'window'
  | 'unplug'
  | 'shield-zap'
  | 'car'
  | 'ban-metal'
  | 'window-alert'
  | 'zap-off'
  | 'wall-ban'
  | 'droplets'
  | 'phone-off'
  | 'radio'
  | 'ambulance'
  | 'waves'
  | 'alert-triangle'
  | 'accessibility'
  | 'utility-pole'
  | 'paw-print';

