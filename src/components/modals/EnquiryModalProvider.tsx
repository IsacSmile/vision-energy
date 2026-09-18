'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalType = 'SERVICE' | 'PRODUCT' | null;

export interface ServiceModalContext {
  serviceSlug: string;
  serviceTitle: string;
}

export interface ProductModalContext {
  categoryCode: string;
  categoryTitle: string;
}

interface EnquiryModalContextType {
  modalType: ModalType;
  serviceContext: ServiceModalContext | null;
  productContext: ProductModalContext | null;
  openServiceModal: (context?: Partial<ServiceModalContext>) => void;
  openProductModal: (context?: Partial<ProductModalContext>) => void;
  closeModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [serviceContext, setServiceContext] = useState<ServiceModalContext | null>(null);
  const [productContext, setProductContext] = useState<ProductModalContext | null>(null);

  const openServiceModal = (context?: Partial<ServiceModalContext>) => {
    setServiceContext({
      serviceSlug: context?.serviceSlug || 'general-service',
      serviceTitle: context?.serviceTitle || 'General Technical Service Booking',
    });
    setProductContext(null);
    setModalType('SERVICE');
  };

  const openProductModal = (context?: Partial<ProductModalContext>) => {
    setProductContext({
      categoryCode: context?.categoryCode || 'LP-01',
      categoryTitle: context?.categoryTitle || 'Lightning Protection Products',
    });
    setServiceContext(null);
    setModalType('PRODUCT');
  };

  const closeModal = () => {
    setModalType(null);
    setServiceContext(null);
    setProductContext(null);
  };

  return (
    <EnquiryModalContext.Provider
      value={{
        modalType,
        serviceContext,
        productContext,
        openServiceModal,
        openProductModal,
        closeModal,
      }}
    >
      {children}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
}
