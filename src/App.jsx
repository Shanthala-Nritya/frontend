import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Guru from './pages/Guru'
import Classes from './pages/Classes'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import BlogSubmit from './pages/BlogSubmit'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPage ? <Navbar /> : null}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/guru" element={<Guru />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />
          <Route path="/blog/submit" element={<BlogSubmit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminPage ? <Footer /> : null}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}
