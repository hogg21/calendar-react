import React, { Component, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

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
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header weekDates={weekDates} today={today} nextWeek={nextWeek} prevWeek={prevWeek}/>
        <Calendar weekDates={weekDates} />
      </>
    );
  }

export default App;
