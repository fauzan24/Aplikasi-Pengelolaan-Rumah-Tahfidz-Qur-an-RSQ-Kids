import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import './index.css'
import App from './App.jsx'
import { NilaiProvider } from './context/NilaiContext.jsx'
import { ProgresBelajarProvider } from './context/ProgresBelajarContext.jsx'
import { PengajarProvider } from './context/PengajarContext.jsx'
import { theme } from './theme/theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NilaiProvider>
          <ProgresBelajarProvider>
            <PengajarProvider>
              <App />
            </PengajarProvider>
          </ProgresBelajarProvider>
        </NilaiProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
