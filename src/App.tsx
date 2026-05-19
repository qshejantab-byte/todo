import { Routes, Route } from "react-router-dom";
import Index from "./Pages/index";
import ApproachPage from "./Pages/approach";
import Contact from "./Pages/contact";
import Discovery from "./Pages/discovery";
import Industries from "./Pages/industries";
import Packages from "./Pages/packages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/approach" element={<ApproachPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/discovery" element={<Discovery />} />
      <Route path="/industries" element={<Industries />} />
      <Route path="/packages" element={<Packages />} />
    </Routes>
  );
}