import { useMemo } from 'react';
import { createDepthTopicFromSymbol } from '../helper'
import { StateContextValue } from './StateProvider';

export type UseSymbolBidAskProps = {
  appState: StateContextValue['appState'];
  webSocketState: StateContextValue['webSocketState'];
  symbol: string;
};

const useSymbolBidAsk = ({ appState, webSocketState, symbol }: StateContextValue & { symbol: string }) => {
  const topic = useMemo(() => createDepthTopicFromSymbol(symbol, appState.depth), [symbol, appState.depth]);
  const stream = useMemo(() => webSocketState.streams.get(topic), [webSocketState.streams]);
  const bids = useMemo(() => stream && stream.bids ? stream.bids : [], [stream && stream.bids]);
  const asks = useMemo(() => stream && stream.bids ? stream.asks : [], [stream && stream.bids]);
  return { topic, stream, bids, asks };
};

export default useSymbolBidAsk;
