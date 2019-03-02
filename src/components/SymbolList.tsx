import React from 'react'
import { useState } from './StateProvider';
import SymbolBidAsk from './SymbolBidAsk'
import SymbolTicker from './SymbolTicker'
import useSymbolList from './useSymbolList';

export type SymbolListProps = {};

const SymbolList: React.SFC<SymbolListProps> = () => {
  const { appState } = useState();
  const vm = useSymbolList({ appState });
  return (
    <>
      {
        vm.favSymbols.map(symbol => (
          <section key={symbol}>
            <div className="border-top my-5"/>
            <h1 className="text-center">{vm.titleForSymbol(symbol)}</h1>
            <SymbolTicker symbol={symbol}/>
            <SymbolBidAsk symbol={symbol}/>
          </section>
        ))
      }
    </>
  );
};

export default SymbolList;
