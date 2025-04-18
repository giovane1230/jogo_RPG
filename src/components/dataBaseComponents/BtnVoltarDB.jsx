import React from 'react';
import { Link } from 'react-router-dom';

const BtnVoltarDB = () => {

    return (
        <Link to="/database">
            <button>
                Voltar
            </button>
        </Link>
    );
};

export default BtnVoltarDB;