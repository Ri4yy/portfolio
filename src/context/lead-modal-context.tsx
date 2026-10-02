"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LeadModalContextType {
  isOpen: boolean;
  openLeadModal: (initialProjectType?: string) => void;
  closeLeadModal: () => void;
  initialType?: string;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialType, setInitialType] = useState<string | undefined>(undefined);

  const openLeadModal = useCallback((projectType?: string) => {
    setInitialType(projectType);
    setIsOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadModalContext.Provider
      value={{ isOpen, openLeadModal, closeLeadModal, initialType }}
    >
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
