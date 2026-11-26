import { lightningData } from './lightning.data';
import { earthingData } from './earthing.data';
import { gymData } from './gym.data';
import { laboratoryData } from './laboratory.data';
import type { ExpertiseTabConfig, ExpertiseTabId } from './types';

export * from './types';

export const EXPERTISE_TABS: ExpertiseTabConfig[] = [
  lightningData,
  earthingData,
  gymData,
  laboratoryData,
];

export const EXPERTISE_TAB_IDS: ExpertiseTabId[] = EXPERTISE_TABS.map((tab) => tab.id);

export function getExpertiseTab(id: ExpertiseTabId): ExpertiseTabConfig {
  return EXPERTISE_TABS.find((tab) => tab.id === id) || lightningData;
}

