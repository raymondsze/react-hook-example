import React from 'react'
import { useState } from './StateProvider';
import useSymbolTicker from './useSymbolTicker';

export type SymbolTickerProps = {
  symbol: string;
};

const SymbolTicker: React.SFC<SymbolTickerProps> = ({ symbol }) => {
  const { webSocketState } = useState();
  const vm = useSymbolTicker({ webSocketState, symbol });
  return (
    <div className="row mt-3">
      <b className="col-12 text-center under-line"><u>24 Hour Stats</u></b>
      {vm.stats.map(it => (
        <div className="text-center text-sm-left col-12 col-sm-6 col-lg-4" key={it.label}>
          <b>{it.label}:</b>{it.value}
        </div>
      ))}
    </div>
  );
};

export default SymbolTicker;
