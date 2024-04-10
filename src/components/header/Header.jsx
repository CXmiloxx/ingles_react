// src/components/header/Header.jsx

import fondo from '../img/glosary.jpeg';
import './Header.css'; 
function Header() {
    return (
        <header className="header">
            <div className="logo cont-img">
                <img src={fondo} alt="Logo" className="logo-img" />
            </div>
            <h1>Glosary Spanish And English</h1>
            <nav>
                <ul>
                    <li>
                        <a href="/" className="nav-link">Inicion</a>
                    </li>
                    <li>
                        <a href="/about" className="nav-link">Sobre Nosotros</a>
                    </li>
                    <li>
                        <a href="/contact" className="nav-link">Contacto</a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/watch?v=XXYlFuWEuKI" className="nav-link">Video</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
