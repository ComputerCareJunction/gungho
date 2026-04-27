import './styles/global.css'
import { mountApp } from './app/mountApp'

const rootElement = document.querySelector<HTMLDivElement>('#app')

if (!rootElement) {
  throw new Error('App root element not found')
}

mountApp(rootElement)
