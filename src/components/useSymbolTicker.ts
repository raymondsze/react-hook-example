import { useMemo } from 'react';
import { StateContextValue } from './StateProvider';
import { createTickerTopicFromSymbol } from '../helper'

export type UseSymbolTickerProps = {
  webSocketState: StateContextValue['webSocketState'];
  symbol: string;
};

const useSymbolTicker = ({ webSocketState, symbol }: UseSymbolTickerProps) => {
  const topic = createTickerTopicFromSymbol(symbol);
  const stream = useMemo(() => webSocketState.streams.get(topic), [webSocketState.streams]);
  const priceChangePercentage = useMemo(() => {
    if (!stream || stream.P === undefined) return ''
    return stream.P > 0 ? `+${stream.P}%` : `${stream.P}%`;
  }, [stream && stream.P]);
  const stats = useMemo(() => !stream ? [] : [
    { label: 'Open', value: stream.o },
    { label: 'High', value: stream.h },
    { label: 'Low', value: stream.l },
    { label: 'Close', value: stream.c },
    { label: 'Volume', value: stream.v },
    { label: 'Best bid', value: stream.b },
    { label: 'Best ask', value: stream.a },
    { label: 'Total Trades', value: stream.n },
    { label: 'Price Change over 24hr', value: priceChangePercentage },
  ], [stream, priceChangePercentage]);
  return { topic, stream, priceChangePercentage, stats };
};

export default useSymbolTicker;
