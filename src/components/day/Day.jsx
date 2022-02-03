import React from 'react';
import Hour from '../hour/Hour';
import Redline from './Redline';
import './day.scss';

const Day = ({ dataDay, dayEvents, date, events }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);
  const currentDay = dataDay === new Date().getDate();
  return (
    <div className="calendar__day" data-day={dataDay}>
      {currentDay && <Redline></Redline>}
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            date={date}
            events={events}
          />
        );
      })}
    </div>
  );
};

export default Day;