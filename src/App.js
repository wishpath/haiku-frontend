import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Upload from "./components/Upload";
import About from "./components/About";
import Haiku from "./components/Haiku";
import {Routes, Route} from "react-router-dom";

function App(){
  return (
    <>
    <Navbar className="container"/>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/haiku" element={<Haiku />} />
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/" element={<About/>}/>
      </Routes>
    </>

  )
}

export default App;