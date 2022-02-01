import moment from 'moment';
import React, { useState } from 'react';

import './modal.scss';

const Modal = ({ onClose, onCreate, date, timeStart, endTime }) => {
  const [eventData, setEvent] = useState({
    title: '',
    description: '',
    timeStart: '20:00',
    endTime: '21:00',
    date: moment(new Date()).format('YYYY-MM-DD')
  })
  const handleChange = e => {
    const { name, value } = e.target;
    setEvent({
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
                value={timeStart}
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
            <button type="submit" className="event-form__submit-btn" onClick={onCreate}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
