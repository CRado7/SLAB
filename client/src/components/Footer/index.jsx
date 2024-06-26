import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4 footer">
      <div className="container text-center mb-5">
        {location.pathname !== '/SLAB/' && (
          <button
            className="btn btn-dark mb-3 text-white"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          Made by surfers for surfers
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
