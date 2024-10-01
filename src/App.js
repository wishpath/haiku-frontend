//App.js
import './App.css';
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Upload from "./components/Upload";
import About from "./components/About";
import Haiku from "./components/Haiku";
import Login from "./components/Login";
import {Routes, Route} from "react-router-dom";
import { LoginProvider } from './context/LoginContext';

function App(){
  return (

    //components wrapped by LoginProvider have access to the LoginContext
    <LoginProvider>
      <div className="app-background">
        <Navbar className="container" />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/haiku" element={<Haiku />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<About />} />
        </Routes>
      </div>
    </LoginProvider>
  )
}

export default App;