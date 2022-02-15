import React from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx'
import moment from 'moment';
import Hour from './components/hour/Hour.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { createTask, fetchEvents, deleteTask } from './gateway/eventsGateway.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = React.useState(new Date());

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
  const closeModal = () => {
    setShow(false)
  }
  const [eventData, setEventData] = React.useState([])

  const getEvents = () => {
    fetchEvents().then((events) => {
      const updatedList = events.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo)
      }))
      setEventData(updatedList)
    })
  }
  const createEvent = (task) => {
    createTask(task).then(() => getEvents())
  }

  const deleteEvent = id => {
    deleteTask(id).then(() => getEvents())
  }

  React.useEffect(() => {
    getEvents()
  }, [])
  const newTasks = eventData.map((event) => {
    const { date, description, title, startTime, endTime } = event;
    return {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`)
    }
  })
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          today={today}
          nextWeek={nextWeek}
          prevWeek={prevWeek}
          weekDates={weekDates}
          openModal={showModal}
          onCreate={createEvent}
        />
        <Calendar
          weekDates={weekDates}
          onCreate={createEvent}
          onDelete={deleteEvent}
          events={eventData}
        />
        {isShow
          && <Modal
            onClose={closeModal}
            date={moment(new Date()).format('YYYY-MM-DD')}
            startTime={moment(new Date()).format('H:mm')}
            endTime={moment(new Date()).add(15, 'minutes').format('H:mm')}
            onDelete={deleteEvent}
            onCreate={createEvent}
          ></Modal>}
      </>
    );
}

export default App;
