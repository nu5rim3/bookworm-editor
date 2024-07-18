import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/gobal.css'
import "./styles/fonts.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/index.ts';
import { Toaster } from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
