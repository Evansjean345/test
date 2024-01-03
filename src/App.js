import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import About from "./components/About";
import AllCourses from "./components/AllCourses";
import Create from "./components/Create";
import Modify from "./components/Modify";
import SignupSection from "./components/SignupSection";
import LoginSection from "./components/LoginSection";
import { AuthContext, AuthProvider } from "./services/account.service";
import { useEffect, useContext, useState, useRef } from "react";
import Loader from "./utils/Loader";

function App() {
  const location = useLocation();
  const { login, isAuthenticated } = useContext(AuthContext);

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // Simulez le chargement en attente pendant 3 secondes (3000 ms)
    const loaderTimeout = setTimeout(() => {
      setLoader(false);
    }, 3000);

    // Nettoyez le timeOut lors du démontage du composant
    return () => clearTimeout(loaderTimeout);
  }, []);

  const prevLocation = useRef(location);

  useEffect(() => {
    // Vérifiez si l'emplacement actuel est différent de l'emplacement précédent
    if (location !== prevLocation.current) {
      // Affichez le loader pendant le chargement de la nouvelle page
      setLoader(true);

      // Utilisez un timeOut pour simuler le chargement pendant 3 secondes (3000 ms)
      const loaderTimeout = setTimeout(() => {
        setLoader(false);
      }, 3000);

      // Nettoyez le timeOut lors du démontage du composant
      return () => clearTimeout(loaderTimeout);
    }

    // Mettez à jour l'emplacement précédent avec l'emplacement actuel
    prevLocation.current = location;
  }, [location]);
  return loader ? (
    <div className="h-[100vh] w-full flex items-center justify-center">
      {" "}
      <Loader />
    </div>
  ) : (
    <div className="App">
      <Routes>
        {isAuthenticated() ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<LoginSection />} />
        )}
        <Route path="/about" element={<About />} />
        <Route path="/all_courses" element={<AllCourses />} />
        <Route path="/create" element={<Create />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/signup" element={<SignupSection />} />
        {/**
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default WrappedApp;
