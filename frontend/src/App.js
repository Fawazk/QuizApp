import './App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register"
import Home from "./Pages/Home";
import Question from "./Pages/Question"
import Result from "./Pages/Result";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/question" element={<Question />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;