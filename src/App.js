import logo from "./logo.svg";
import "./App.css";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import About from "./views/About";
import Pokemon from "./views/Pokemon";
import PostSingle from "./views/PostSingle";
import { AuthContext } from "./contexts/AuthProvider";

function App() {
  const { login, user, logout } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/pokemon">Pokemon</Link>
          </li>
        </ul>
      </nav>
      <div>
        { user.loggedIn ? ( 
        <>
        <button onClick={logout}>Logout</button>
        <p>Current User: {user.displayName} </p>
        </>
        ) : (
        <button onClick={login}>Login</button>
        )} 
      </div>
      <Routes>
        <Route path="/post/:uid/:id" element={<PostSingle />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
