
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RootLayout from './layout.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate persistor={persistor} loading={null}>
        <RootLayout>
          <App />
        </RootLayout>
      </PersistGate>
    </QueryClientProvider>
  </Provider>,
)
