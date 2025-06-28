import Mainpage from "./components/Mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
