import { useCallback } from 'react';
import { StateContextValue } from './StateProvider';

export type UseSymbolListProps = {
  appState: StateContextValue['appState'];
};

const useSymbolList = ({ appState }: UseSymbolListProps) => {
  const depth = appState.depth;
  const favSymbols = appState.favSymbols;
  const titleForSymbol = useCallback((symbol) => symbol.toUpperCase(), []);
  return { depth, favSymbols, titleForSymbol };
};

export default useSymbolList;
