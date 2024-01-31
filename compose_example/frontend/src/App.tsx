import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import "./App.css";
import TaskForm from "./components/taskform";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<TaskForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
