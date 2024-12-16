import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import store from './store/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from 'react-router-dom'

const persister = persistStore(store);


createRoot(document.getElementById('root')).render(
  <>
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister} >
        <App />
      </PersistGate>
    </Provider>
    <Toaster/>
  </Router>
  </>,
)
