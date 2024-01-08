import React from 'react';
import { Link } from 'react-router-dom';

// const navigation = [
//     { name: "Dashboard", href: "/dashboard", current: true },
//     { name: "Inventory", href: "/inventory", current: false },
// ];

// const userNavigation = [{ name: "Sign out", href: "./" }];

const Header = () => {
    return (
        <header className="container my-4">
            <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                    <h1>Inventory Management App</h1>
                </div>
                <div className="col-auto">
                    <nav>
                        <ul className="list-inline">
                            <li className="list-inline-item"><Link to="/">Home</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;