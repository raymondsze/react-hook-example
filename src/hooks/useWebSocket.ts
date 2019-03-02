import { useCallback, useState, useMemo, useRef } from 'react';
import { createDepthTopicFromSymbol, createTickerTopicFromSymbol } from '../helper';

export type WebSocketState = {
  topics: string[];
  socket?: WebSocket;
};

const initialState: WebSocketState = {
  topics: [],
};

export function useWebSocket(host = 'stream.binance.com', port = 9443) {
  const [state, setState] = useState(initialState);
  const { topics, socket } = state;

  // we need put the streams into ref so we could reference the streams map in handleMessages
  const streams = useRef<Map<string, any>>();
  if (!streams.current) streams.current = new Map();

  // @computed
  const topicStr = useMemo(() => topics.join('/'), [topics]);

  // @computed
  const url = useMemo(() => {
    // Binance Websocket Documentation
    // https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md
    return `wss://${host}:${port}/stream?streams=${topicStr}`
  }, [host, port, topicStr]);

  // reconnect the socket if topics changed
  // this callback only replaced if topics is changed
  useMemo(() => {
    socket && socket.close();
    const newSocket = new WebSocket(url);
    const _handleMessage = (event: MessageEvent) => {
      const { stream, data } = JSON.parse(event.data);
      const newStreams = new Map(streams.current!);
      newStreams.set(stream, data);
      streams.current = newStreams;
      setState(prevState => ({ ...prevState }));
    };
    newSocket.onmessage = _handleMessage;
    // update to newSocket
    setState(prevState => ({ ...prevState, socket: newSocket }));
  }, [topics]);

  // subscribe the symbols
  // this callback only replaced if host or port is changed
  const subscribeSymbols = useCallback((symbols: string[], depth: number) => {
    const depthTopics = symbols.map(s => createDepthTopicFromSymbol(s, depth));
    const tickerTopics = symbols.map(createTickerTopicFromSymbol);

    const topics = [...depthTopics, ...tickerTopics];
    streams.current = new Map();
    topics.forEach((topic) => streams.current!.set(topic, {}));
    setState(prevState => ({ ...prevState, topics }));

    return topics;
  }, [host, port]);

  return {
    ...state,
    url,
    subscribeSymbols,
    // we already know streams must be there
    streams: streams.current!,
  };
}
