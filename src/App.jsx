import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Animals from "./pages/Animals.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/animals" element={<Animals />} />
      </Routes>
    </Router>
  );
}

export default App;
