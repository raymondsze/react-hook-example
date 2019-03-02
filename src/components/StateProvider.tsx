import React, { createContext, useContext } from 'react';
import { useApp } from '../hooks/useApp';
import { useWebSocket } from '../hooks/useWebSocket';
import { ApiService } from '../services/ApiService'

export type StateContextValue = {
  appState: ReturnType<typeof useApp>;
  webSocketState: ReturnType<typeof useWebSocket>;
};

const StateContext = createContext<StateContextValue>(null as any);

export type StateProviderProps = {
  apiService: ApiService;
  children: React.ReactNode;
};

const StateProvider: React.SFC<StateProviderProps> = ({ children, apiService }) => {
  const appState = useApp(apiService);
  const webSocketState = useWebSocket();
  return (
    <StateContext.Provider value={{ appState, webSocketState }}>
      {children}
    </StateContext.Provider>
  );
}

export const useState = () => useContext(StateContext);
export default StateProvider;