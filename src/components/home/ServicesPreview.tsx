import React from 'react';
import { getPublishedServices } from '@/lib/data/services';
import ServicesCarouselClient from './ServicesCarouselClient';

export default async function ServicesPreview() {
  const servicesAll = await getPublishedServices();

  return <ServicesCarouselClient totalServicesCount={servicesAll.length} />;
}
