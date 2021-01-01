import React from 'react';

export default ({ comments }) => {

  const renderedComments = comments.map(comment => {
    let content;

    if (comment.status === 'APPROVED') {
      content = comment.content;
    } else if (comment.status === 'PENDING') {
      content = 'This comment is awaiting moderation';
    } else {
      content = 'This comment has been rejected';
    }

    comment.content = content;

    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
