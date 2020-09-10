import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
export function Header() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div>
        <p>rutas</p>
      </div>
      <div>
        <Button variant="contained" color="primary">
          <Link to="/">Home</Link>
        </Button>
        <br></br>
        <button>
          <Link to="/login">Login</Link>
        </button>{' '}
        <br></br>
        <button>
          <Link to="/perfil">Perfil</Link>
        </button>
      </div>
      <span>Header container</span>
    </>
  );
}
