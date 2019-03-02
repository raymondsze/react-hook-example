import { useCallback, useMemo } from 'react';
import { StateContextValue } from './StateProvider';

export type UseControlPanelProps = {
  appState: StateContextValue['appState'];
  webSocketState: StateContextValue['webSocketState'];
};

const useControlPanel = ({ appState, webSocketState }: UseControlPanelProps) => {
  const depthOptions = [5, 10, 20];
  const subscribedUrl = webSocketState.url;
  const subscribedTopics = webSocketState.topics;

  const depth = appState.depth;

  useMemo(async () => {
    // perform auto subscribe
    const favSymbols = await appState.fetchFavSymbols();
    webSocketState.subscribeSymbols(favSymbols, depth);
  }, [depth]);

  const onSelectDepth = useCallback(async (event) => {
    appState.setDepth(event.target.value);
  }, [appState]);

  const selectEventUidByTopic = useCallback((topic: string) => {
    const stream = (webSocketState.streams.get(topic) || {});
    return stream.lastUpdateId || stream.E;
  }, [webSocketState.streams]);

  return {
    depth: appState.depth,
    depthOptions,
    subscribedUrl,
    subscribedTopics,
    onSelectDepth,
    selectEventUidByTopic,
  };
};

export default useControlPanel;
