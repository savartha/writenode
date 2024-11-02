import { Link, NavLink } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useState } from "react";

import { auth,provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
export const Header = () => {
    const [isLogin,setIsLogin]  = useState(JSON.parse(localStorage.getItem("isLogin"))  || false);

    function handleLogin(){
        signInWithPopup(auth,provider).then ((result)=>{
            console.log(result);
            setIsLogin(true);
            localStorage.setItem("isLogin",true)
        })
    }
    function handleLogout(){
        signOut(auth);
        setIsLogin(false);
        localStorage.setItem("isLogin",false)
    }
  return (
    <header>
        <Link className="logo" to="/">
            <img  src={Logo} alt="WriteNode" />
            <span>WriteNode</span>
        </Link>
        <nav className="nav">
            <NavLink   to="/"  className="link" end>Home</NavLink>
            {isLogin ? (
                <>
                    <NavLink   to="/create"  className="link" >Create</NavLink>
                    <button  onClick={handleLogout} className="auth"><i className="bi bi-box-arrow-right"></i>Logout</button>
                </>
            ) : (
                <button onClick={handleLogin} className="auth"><i className="bi bi-google"></i>Login</button>
            )}
        </nav>
    </header>
  )
}
