import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#08090D] text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center mb-4 text-2xl font-bold font-mono">
              IA
            </div>
            <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-400 mb-6">
              An unexpected error occurred while rendering the page.
            </p>
            <pre className="text-xs text-left bg-black/40 p-3 rounded-lg text-red-400 overflow-x-auto mb-6 font-mono">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all shadow-glow-dual"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
