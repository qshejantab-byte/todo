/* App.tsx */
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Index from "./Pages/index";
import ApproachPage from "./Pages/approach";
import Contact from "./Pages/contact";
import Discovery from "./Pages/discovery";
import Industries from "./Pages/industries";
import Packages from "./Pages/packages";

// Theme variables export for use in components if needed
export const theme = {
  colors: {
    navy: 'var(--navy)',
    ink: 'var(--ink)',
    inkMuted: 'var(--ink-muted)',
    canvas: 'var(--canvas)',
    canvasAlt: 'var(--canvas-alt)',
    yellow: 'var(--yellow)',
    orange: 'var(--orange)',
    pink: 'var(--pink)',
    teal: 'var(--teal)',
    blue: 'var(--blue)',
    lavender: 'var(--lavender)',
  },
  fonts: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    '3xl': 'var(--radius-3xl)',
    '4xl': 'var(--radius-4xl)',
  },
};

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