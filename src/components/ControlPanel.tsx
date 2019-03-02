import React from 'react';
import { useState } from './StateProvider';
import useControlPanel from './useControlPanel';

export type ControlPanelProps = {};

const ControlPanel: React.SFC<ControlPanelProps> = () => {
  const { appState, webSocketState } = useState();
  const vm = useControlPanel({ appState, webSocketState });

  return (
    <div className="mt-5">
      <label>Depth:</label>
      <select value={vm.depth} onChange={vm.onSelectDepth}>
        {vm.depthOptions.map(d => (
          <option key={d}>{d}</option>
        ))}
      </select>
      <p>
        <b>Subscribed WebSocket URL:</b> {vm.subscribedUrl}
      </p>
      <b>Subscribed Topics</b>
      <ul>
        {
          vm.subscribedTopics.map(it => (
            <li key={it}>
              {it}(event uid:{vm.selectEventUidByTopic(it)})
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ControlPanel;
