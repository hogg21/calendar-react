import React from 'react';
import Hour from '../hour/Hour';
import RedLine from './RedLine';

import './day.scss';

const Day = ({ dataDay, dayEvents }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);
  
  
  const currentDay = dataDay === new Date();
  return (
    <div className="calendar__day" data-day={dataDay}>
      {currentDay ? <RedLine></RedLine> : null}
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour key={dataDay + hour} dataHour={hour} hourEvents={hourEvents} />
        );
      })}
    </div>
  );
};

export default Day;
