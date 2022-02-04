import moment from 'moment';
import React from 'react';
import events from '../../gateway/events';

import './modal.scss';

const Modal = ({ onClose, date, startTime, endTime, onCreate }) => {
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
  const { id, title, description } = eventData;
  const newTask = {
    title,
    dateFrom: new Date(`${date} ${startTime}`),
    dateTo: new Date(`${date} ${endTime}`),
    id,
    description,
  };

  const intervalEvent = Date.parse(newTask.dateTo) - Date.parse(newTask.dateFrom) / (60 * 60 * 1000);

  const originalTime =
    events === []
      ? true
      : events.every((el) => {
          return (
            Date.parse(newTask.dateTo) < Date.parse(el.dateFrom) ||
            Date.parse(newTask.dateFrom) > Date.parse(el.dateTo)
          );
        });
  const realTimeInterval =
  intervalEvent > 0 && originalTime && intervalEvent < 6 && title !== "";

  const createNewTask = task => {
    const time = Date.parse(newTask.dateTo) < Date.parse(new Date())
    ? alert("создаеться завершенное событие")
      : null;
    onCreate(task)
    // onClose(false)
  }

  const dataError = () => {
    const errorOriginal = !originalTime
      ? "Два события не могут пересекаться по времени "
      : "";
    const errorOneDay =
    intervalEvent > 0
        ? ""
        : "Событие должно начаться и закончиться в пределах одного дня ";
    const errorMaxInterval =
    intervalEvent < 6 ? "" : "Одно событие не может быть дольше 6 часов ";
    const notTitle = title !== "" ? "" : "Заполни заголовок ";
    return alert(notTitle + errorOriginal + errorOneDay + errorMaxInterval);
  };
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onClose}>+</button>
          <form className="event-form" onSubmit={
            (e) => { e.preventDefault(); realTimeInterval ? dataError() : createNewTask(newTask)}}>
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
