import React from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx'
import moment from 'moment';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { createTask, getTasks, deleteTask } from './gateway/eventsGateway.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = React.useState(getWeekStartDate(new Date()));

  const today = () => {
    setWeekStartDate(new Date())
  }
  const nextWeek = () => {
    setWeekStartDate(new Date(weekStartDate.setDate(new Date(weekStartDate).getDate() + 7)))
  }
  const prevWeek = () => {
    setWeekStartDate(new Date(weekStartDate.setDate(new Date(weekStartDate).getDate() - 7)))

  }
  const [isShow, setShow] = React.useState(false)

  const showModal = () => {
    setShow(true)
  }
  const hideModal = () => {
    setShow(false)
  }
  const [eventData, setEventData] = React.useState([])

  const fetchEventsList = () => {
    getTasks().then((events) => {
      const updatedListEvents = events.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo)
      }))
      setEventData(updatedListEvents)
    })
  }

  const createEvent = (taskData) => {
    const { description, startTime, endTime, date, title } = taskData;
    const newTasks = {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`)
    }
    createTask(newTasks).then(() => fetchEventsList())
    .then(() => setShow(!isShow))
  }

  const deleteEvent = id => {
    deleteTask(id).then(() => fetchEventsList())
  }

  React.useEffect(() => {
    fetchEventsList()
  }, [])
  console.log(eventData);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          today={today}
          nextWeek={nextWeek}
          prevWeek={prevWeek}
          weekDates={weekDates}
          openModal={showModal}
          events={eventData}
          onCreate={createEvent}
        />
        <Calendar
          weekDates={weekDates}
          events={eventData}
          onCreate={createEvent}
          onDelete={deleteEvent}
        />
        {isShow
          && <Modal
            onClose={hideModal}
            date={moment(new Date()).format('YYYY-MM-DD')}
            startTime='21:00'
            endTime='22:00'
            onDelete={deleteEvent}
            onCreate={createEvent}
            events={eventData}
          ></Modal>}
      </>
    );
}

export default App;
