import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Portdev } from "./pages/Portdev";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portdev" element={<Portdev />} />
    </Routes>
  )
}