// src/components/header/Header.jsx

import fondo from '../img/glosary.jpeg';
import './Nav.css'; 
function Nav() {
    return (
        <header className="header">
            <div className="logo cont-img">
                <img src={fondo} alt="Logo" className="logo-img" />
            </div>
            <h1>Glosary Spanish And English</h1>
        </header>
    );
}

export default Nav;
