import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './app/store'
import { BrowserRouter } from 'react-router-dom'
import Global from './index.styles'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Global />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
