import Home from "./pages/home/home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Queueing from "./pages/queueing/queueing";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
   <DndProvider backend={HTML5Backend}>
      <Router>
      <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/queueing" element={<Queueing />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
   </DndProvider>
  );
}

export default App;

