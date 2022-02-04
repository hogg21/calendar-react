import React from 'react';
import DeleteEvent from './DeleteEvent';

import './event.scss';

const Event = ({ height, marginTop, title, time, onDelete, id }) => {
  const eventStyle = {
    height,
    marginTop,
  };
  const [visibility, setVisibility] = React.useState(false);

  const toggleModalWindow = () => {
    setVisibility(!visibility)
  }
  return (
    <div style={eventStyle} className="event" onClick={toggleModalWindow}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {visibility && <DeleteEvent onDelete={onDelete} id={id}></DeleteEvent>}
    </div>
  );
};

export default Event;
