import { useState } from "react";
import { Link } from 'react-router-dom';

const Header = () => {
    let [isNavShow, setIsNavShow] = useState(false);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand ps-2" href="#">Festival APP</span>
                <button onClick={() => setIsNavShow(!isNavShow)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={isNavShow ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/todos">TODO</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/eduinfo">FESTIVAL INFO</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites">PICTURE</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
