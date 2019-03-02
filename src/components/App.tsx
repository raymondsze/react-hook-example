import React, { useMemo } from 'react'
import StateProvider from './StateProvider'
import ControlPanel from './ControlPanel'
import SymbolList from './SymbolList'
import { ApiService } from '../services/ApiService'

function App() {
  const apiService = useMemo(() => new ApiService(), []);
  return (
    <div className="container">
      <StateProvider apiService={apiService}>
        <ControlPanel/>
        <SymbolList />
      </StateProvider>
    </div>
  )
}

export default App;
