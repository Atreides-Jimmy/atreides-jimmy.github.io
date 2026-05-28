import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Hobbies from "@/pages/Hobbies";
import GoGameDetail from "@/pages/GoGameDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/hobbies/go/:id" element={<GoGameDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}
