import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import CreateListing from './pages/CreateListing'
import PrivateRoute from './components/PrivateRoute'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing/>} />
        </Route>
        
     </Routes>
    </BrowserRouter>
  )
}
