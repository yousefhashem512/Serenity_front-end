import SidebarContext from './SidebarContextValue';
import { useState } from 'react';

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : false
  );

  const toggleSidebar = () => setIsOpen((v) => !v);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
