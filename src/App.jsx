import React from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx'
import moment from 'moment';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { createTask, getTasks, deleteTask } from './gateway/eventsGateway.js';

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
  const hideModal = () => {
    setShow(false)
  }
  const [eventData, setEventData] = React.useState([])

  const fetchList = () => {
    getTasks().then((events) => {
      const updatedList = events.map((event) => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo)
      }))
      setEventData(updatedList)
    })
  }
  const createEvent = task => {
    const { date, description, title, startTime, endTime } = task;
    const newTask = {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`)
    }
    createTask(newTask).then(() => fetchList())
  }

  const deleteEvent = id => {
    deleteTask(id).then(() => fetchList())
  }

  React.useEffect(() => {
    fetchList()
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
            onClose={hideModal}
            date={moment(new Date()).format('YYYY-MM-DD')}
            startTime='21:00'
            endTime='22:00'
            onDelete={deleteEvent}
            onCreate={createEvent}
          ></Modal>}
      </>
    );
}

export default App;
