import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './components/Signup'
import Signin from './components/Signin'
import AddNotes from './components/addNotes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <h1 className='bg-green-500 text-3xl text-center p-6 text-bold'>Notes App</h1>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/notes" element={<AddNotes />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
