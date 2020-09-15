import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import PostItem from '../posts/PostItem';
import { getPostById } from '../../actions/post';

const Post = ({ match, post: { post, loading }, getPostById }) => {
  useEffect(() => {
    getPostById(match.params.id);
  }, [getPostById, match.params.id]);

  return (
    <Fragment>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/posts' className='btn btn-light'>
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          {post.comments &&
            post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                postId={post._id}
                comment={comment}
              />
            ))}
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPostById })(Post);
