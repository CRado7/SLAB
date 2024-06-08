import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import '../../styles/Header.css';

import SLAB from '/SLAB.svg';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header">
      <div className="container-header flex-row align-center">
        <div className="flex-row align-center">
          <Link to="/SLAB/">
            <img className="logo-header" src={SLAB}></img>
          </Link>
          {/* <p className="m-0">Just Another Surf Blog</p> */}
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-dark text-white btn-info m-1 login" to="me">
                {/* {Auth.getProfile().data.username}'s profile */}
                Profile
              </Link>
              <button className="btn btn-dark text-white m-1 login" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-dark text-white btn-info m-2 login" to="login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
