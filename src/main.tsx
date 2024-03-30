import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './context/theme'
import { Background } from './components'
import '../global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider>
            <Background />
            <div className='absolute top-0 left-0 w-full bg-transparent'>
                <App />
            </div>
        </ThemeProvider>
    </React.StrictMode>
)
