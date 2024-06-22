import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        {/* //to make the dashboard private that is if you are not signed in then you cannot access the dashboard */}
        <Route element={<PrivateRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>

          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postid" element={<UpdatePost />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/post/:postSlug" element={<ScrollToTop />} />
        </Route>


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
