import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load page components
const OurScents = lazy(() => import("./pages/OurScents"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Shop = lazy(() => import("./pages/Shop"));
const FragranceQuiz = lazy(() => import("./pages/FragranceQuiz"));
const Contact = lazy(() => import("./pages/Contact"));
const SignIn = lazy(() => import("./pages/SignIn"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scents" element={<OurScents />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/quiz" element={<FragranceQuiz />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          {/* Add more routes as they are implemented */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
