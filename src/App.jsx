import React, { Component, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import { createTask, getTasks, deleteTask } from './gateway/eventsGateway.js';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [events, setEvents] = useState([]);
  const today = () => {
    setWeekStartDate(new Date())
  }
  const nextWeek = () => {
    setWeekStartDate(new Date(weekStartDate.setDate(new Date(weekStartDate).getDate() + 7)))
  }
  const prevWeek = () => {
    setWeekStartDate(new Date(weekStartDate.setDate(new Date(weekStartDate).getDate() - 7)))
  }

  const [isShow, setShow] = useState(false);
  const showModal = () => {
    setShow(true)
  }
  const hideModal = () => {
    setShow(false)
  }

  const getEvents = () => {
    getTasks().then((data) => {
      setEvents(data)
    })
  }

  const createEvent = eventData => {
    createTask(eventData).then(() => getEvents())
  }
  const deleteTask = (id) => {
    deleteTask(id).then(() => getEvents())
  }

  const newEvent = events.map((e) => {
    const { title, date, description, timeStart, endTime } = e
    setEvents({
      title,
      description,
      dateFrom: new Date(`${date} ${timeStart}`),
      dateTo: new Date(`${date} ${endTime}`)
    })
  })
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    return (
      <>
        <Header weekDates={weekDates} today={today} nextWeek={nextWeek} prevWeek={prevWeek} openModal={showModal} events={newEvent}/>
        <Calendar weekDates={weekDates} events={newEvent}/>
        {isShow && <Modal onClose={hideModal} onCreate={createEvent}></Modal>}
      </>
    );
  }

export default App;
