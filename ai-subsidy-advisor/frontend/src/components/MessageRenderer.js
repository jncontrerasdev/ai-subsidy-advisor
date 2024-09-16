import React from 'react';
import PropTypes from 'prop-types';

const MessageRenderer = ({ advice }) => {
  const paragraphs = advice.split('\n\n').map((para, index) => <p key={index}>{para}</p>);

  return <div>{paragraphs}</div>;
};

MessageRenderer.propTypes = {
  advice: PropTypes.string.isRequired,
};

export default MessageRenderer;