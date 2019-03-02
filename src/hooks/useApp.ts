import { useCallback, useState } from 'react';

export type AppState = {
  depth: number;
  favSymbols: string[];
};

const initialState: AppState = {
  depth: 10,
  favSymbols: [],
};

export function useApp(apiService: any) {
  const [state, setState] = useState(initialState);

  // this callback only change if apiService is replaced
  const fetchFavSymbols = useCallback(async () => {
    const favSymbols = await apiService.getFavSymbols();
    setState(prevState => ({ ...prevState, favSymbols }));
    return favSymbols;
  }, [apiService]);

  // set the depth
  // this callback never change
  const setDepth = useCallback((depth: number) => {
    setState(prevState => ({ ...prevState, depth }));
  }, []);

  return {
    ...state,
    setDepth,
    fetchFavSymbols,
  };
}
