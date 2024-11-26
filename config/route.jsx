import react from "react"
import { BrowserRouter, Routes,Route } from "react-router-dom"
import Home from "../screens/Home/home"
import Login from "../screens/Login/login"

const Router = ()=>{
    return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>

    </Routes>
    </BrowserRouter>
)
}

export default Router