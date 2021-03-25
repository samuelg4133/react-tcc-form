import React from 'react';
import {Link} from "react-router-dom";

import "./styles.css";

const Nav = () => {
    return (
        <nav>
            <Link  to='/students'>Alunos</Link>
            <Link to="/teachers">Professores</Link>
        </nav>
    );
};

export default Nav;

