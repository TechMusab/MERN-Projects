import Signup from './components/Signup'
import Signin from './components/Signin'
import AddNotes from './components/addNotes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
   <h1 className="bg-gradient-to-r from-green-400 to-green-600 text-white text-4xl font-extrabold text-center py-6 shadow-lg rounded-b-2xl">
  Notes App
</h1>

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
