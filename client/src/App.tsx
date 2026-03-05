import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
