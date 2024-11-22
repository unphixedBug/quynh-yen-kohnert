import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Creations from './pages/Creations'
import ArtworkDetail from './pages/ArtworkDetail'
import About from './pages/About'
import Contact from './pages/Contact'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Query error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        })
      }
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-light font-sans text-dark">
          <Navigation />
          <main className="pt-[84px] md:pt-[84px] lg:pt-0 lg:pl-[8.333333%]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/creations" element={<Creations />} />
              <Route path="/creations/:id" element={<ArtworkDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App