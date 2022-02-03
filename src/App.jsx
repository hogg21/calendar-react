import React from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx'
import moment from 'moment';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

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

  const newTasks = eventData.map((e) => {
    const { title, description, startTime, endTime, date } = e;
    setEventData({
      id,
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`)
    })
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
        />
        <Calendar weekDates={weekDates} events={newTasks}/>
        {isShow
          && <Modal
            onClose={hideModal}
            date={moment(new Date()).format('YYYY-MM-DD')}
            startTime={moment(new Date()).format('H:mm')}
            endTime={moment(new Date()).format('H:mm')}
          ></Modal>}
      </>
    );
}

export default App;
