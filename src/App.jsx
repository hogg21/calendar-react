import React, { Component, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx'

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
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
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    return (
      <>
        <Header weekDates={weekDates} today={today} nextWeek={nextWeek} prevWeek={prevWeek} openModal={showModal}/>
        <Calendar weekDates={weekDates} />
        {isShow && <Modal onClose={hideModal}></Modal>}
      </>
    );
  }

export default App;
