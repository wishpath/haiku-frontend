//App.js
import './tool/App.css';
import Navbar from "../components/navbar/Navbar";
import NotFound from "../components/notfound/NotFound";
import Upload from "../components/csvupload/CSVUpload";
import About from "../components/about/About";
import Haiku from "../components/haiku/Haiku";
import LoginPage from "../components/login/LoginPage";
import {Routes, Route} from "react-router-dom";
import { LoginProvider } from '../context/LoginContext';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<About />} />
        </Routes>
      </div>
    </LoginProvider>
  )
}

export default App;

