import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'

const rootElement = document.querySelector<HTMLDivElement>('#app')

if (!rootElement) {
  throw new Error('App root element not found')
}

createRoot(rootElement).render(
  createElement(StrictMode, null, createElement(App)),
)
