import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {usePokeStore} from './store/PokeStore.tsx'

usePokeStore.subscribe((state) => console.log("New State:" , state))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
