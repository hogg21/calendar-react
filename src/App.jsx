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
    getTasks().then((data) => setEventData(data))
  }

  const createEvent = taskData => {
    createTask(taskData).then(() => fetchEventsList())
  }

  const deleteEvent = id => {
    deleteTask(id).then(() => fetchEventsList())
  }

  React.useEffect(() => {
    fetchEventsList()
  }, [])
  console.log(eventData);

  const newTasks = eventData.map((event) => {
    const { id, title, description, startTime, endTime, date } = event;
    return {
      id,
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
          events={newTasks}
          onCreate={createEvent}
        />
        <Calendar
          weekDates={weekDates}
          events={newTasks}
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
            events={newTasks}
          ></Modal>}
      </>
    );
}

export default App;
