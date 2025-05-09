import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404</h1>
            <p>Oops! A página que você está procurando não foi encontrada.</p>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                Voltar para a página inicial
            </Link>
        </div>
    );
};

export default NotFound;