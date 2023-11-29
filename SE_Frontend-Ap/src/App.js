import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CustomHostForm from "./components/CustomHostForm";
import DisplayEvents from "./components/DisplayEvents";
import Home from "./components/Home";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Responses from "./components/Responses";
import PredefinedHostForm from "./components/PredefinedHostForm";

function App() {
  const {catId} = useParams();
  useEffect(()=>{
    console.log(catId)},[catId]);
  return (
    <div>

        <BrowserRouter>
            <AppHeader />
            <Routes>
                <Route path="/home" element= { <Home/>} />
                <Route path="/responses" element={<Responses />} />
                <Route path="/register" element= { <Register/>} />
                <Route path="/login" element= { <Login/>} />
                <Route path="/customHostForm" element= { <CustomHostForm/>} />
                <Route path="/events/:eventId" element={<DisplayEvents />} />
                <Route path="/predefinedHostForm/:eventType" element={<PredefinedHostForm />} />
            </Routes>
            <AppFooter />
        </BrowserRouter>
      
    </div>
  );
}

export default App;