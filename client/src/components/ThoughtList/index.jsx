import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  return (
    <div>
    {Auth.loggedIn() ? (
      <>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-dark p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-white"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    posted this <i>{thought.createdAt}</i>
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You posted this on <i className="date">{thought.createdAt}</i>
                  </span>
                </>
              )}
            </h4>
            <div className="card-body  p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary text-white btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              <b>View comments or add a comment!</b>
            </Link>
          </div>
        ))}
    </>
  ) : (
    <>
    </>
  )};
  </div>
  );
};

export default ThoughtList;
// if (!thoughts.length) {
//   return <h3>Sign up or Login to see whats happening!</h3>;
// }
