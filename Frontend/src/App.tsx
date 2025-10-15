import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Registerpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello</h1>} />
      <Route path="/registerpage" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
