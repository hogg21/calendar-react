import moment from 'moment';
import React from 'react';

import { days } from '../../utils/dateUtils.js';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate, index) => {
        let dayWeek = moment(dayDate).format('MMMM Do YYYY') !== moment(new Date()).format('MMMM Do YYYY') ? (
          { backgroundColor: 'aqua', color: 'white' } ): (
          { backgroundColor: 'orange', color: 'red' }
        )
        return (
          <div key={index} className="calendar__day-label day-label" style={dayWeek}>
            <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
            <span className="day-label__day-number">{dayDate.getDate()}</span>
          </div>
        )
      })}
    </header>
  )
};

export default Navigation;
