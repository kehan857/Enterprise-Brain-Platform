import React, { createContext, useContext, useState, useCallback } from 'react';
import AIAssistant from './index';

interface GlobalAIAssistantContextType {
  visible: boolean;
  showAssistant: () => void;
  hideAssistant: () => void;
  toggleAssistant: () => void;
}

const GlobalAIAssistantContext = createContext<GlobalAIAssistantContextType>({
  visible: false,
  showAssistant: () => {},
  hideAssistant: () => {},
  toggleAssistant: () => {},
});

export const useGlobalAIAssistant = () => useContext(GlobalAIAssistantContext);

export const GlobalAIAssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showAssistant = useCallback(() => setVisible(true), []);
  const hideAssistant = useCallback(() => setVisible(false), []);
  const toggleAssistant = useCallback(() => setVisible(prev => !prev), []);

  return (
    <GlobalAIAssistantContext.Provider
      value={{
        visible,
        showAssistant,
        hideAssistant,
        toggleAssistant,
      }}
    >
      {children}
      <AIAssistant
        visible={visible}
        onClose={hideAssistant}
        isGlobal={true}
      />
    </GlobalAIAssistantContext.Provider>
  );
};