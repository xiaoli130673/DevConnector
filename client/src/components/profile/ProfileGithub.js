import React, { Fragment, useEffect } from 'react';
import { getGithubRepos } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username, profile: { repos }, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <Fragment>
      {repos === null ? (
        <Spinner />
      ) : (
        <div className='profile-github'>
          <h2 className='text-primary'>Github Repos</h2>
          {repos.map((repo) => (
            <div key={repo.id} className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className='badge badge-dark'>
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className='badge badge-light'>
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
