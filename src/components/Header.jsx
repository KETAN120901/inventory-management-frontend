import React from 'react';
import { Outlet, Link } from "react-router-dom";
function Header() {
    return <header>
        <div>
            <div><a href='/'><img height="65" alt="Chouhan Kirana" title="Chouhan Kirana" src="http://www.kirana.store/image/catalog/Company/5123.jpg" /></a></div><div>
                <a href="/enter?back=%2F">Enter </a>
                |
                <a href="/register"> Register</a>

            </div>
        </div>
        </header>


}
export default Header;