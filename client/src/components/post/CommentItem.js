import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';
import PropTypes from 'prop-types';

const CommentItem = ({
  auth,
  postId,
  comment: { _id, user, text, name, avatar, date },
  removeComment,
}) => {
  return (
    <div className='post bg-white p-1 m-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => removeComment(postId, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { removeComment })(CommentItem);
