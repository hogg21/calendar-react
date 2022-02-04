import React from 'react';
import Hour from '../hour/Hour';
import RedLine from './RedLine';
import './day.scss';

const Day = ({ dataDay, dayEvents, date, onCreate, onDelete }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);
  const currentDay = dataDay === new Date().getDate();
  return (
    <div className="calendar__day" data-day={dataDay}>
      {currentDay && <RedLine></RedLine>}
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
            onCreate={onCreate}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default Day;