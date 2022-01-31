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
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header today={today}/>
        <Calendar weekDates={weekDates} />
      </>
    );
  }

export default App;
