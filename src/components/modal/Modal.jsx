import moment from 'moment';
import React from 'react';

import './modal.scss';

const Modal = ({ onClose, date, startTime, endTime }) => {
  const [eventData, setEventData] = React.useState({
    title: '',
    description: '',
    startTime: moment(new Date()).format('H:mm'),
    endTime: moment(new Date()).format('H:mm'),
    date: moment(new Date()).format('YYYY-MM-DD')
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    })
  }
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onClose}>+</button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={eventData.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input type="date" name="date" className="event-form__field" value={date} onChange={handleChange}/>
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={eventData.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
