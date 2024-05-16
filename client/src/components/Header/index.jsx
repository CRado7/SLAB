import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import SLAB from '/public/SLAB.svg'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="col-12 text-dark mb-4 py-0 flex-row align-center header">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="flex-row align-center">
          <Link to="/">
            <img className="m-4 logo" src={SLAB}></img>
          </Link>
          <p className="m-0">Surf Report Message Board</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-md btn-info m-4" to="/login">
                Login
              </Link>
              <Link className="btn btn-md btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
