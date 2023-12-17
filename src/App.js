import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message="This is best Note app"/>
    <div className="container">
    {/* <Home/> */}
    <Routes>
    <Route exact path="/home" element={< Home/>}></Route>
    <Route exact path="/about" element={< About/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
  
   </>
  );
}

export default App;
