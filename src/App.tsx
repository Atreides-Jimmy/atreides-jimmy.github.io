import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Hobbies from "@/pages/Hobbies";
import GoHobby from "@/pages/GoHobby";
import GoGameDetail from "@/pages/GoGameDetail";
import CyclingHobby from "@/pages/CyclingHobby";
import CyclingRideDetail from "@/pages/CyclingRideDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/hobbies/go" element={<GoHobby />} />
          <Route path="/hobbies/go/:id" element={<GoGameDetail />} />
          <Route path="/hobbies/cycling" element={<CyclingHobby />} />
          <Route path="/hobbies/cycling/:id" element={<CyclingRideDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}
