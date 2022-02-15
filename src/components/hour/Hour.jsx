import React, { useEffect } from 'react';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, onCreate, onDelete, events }) => {

  const timeStart = dataHour < 10 ? `0${dataHour}:00` : `${dataHour}:00`;
  const timeEnd = dataHour < 9 ? `0${dataHour + 1}:00` : `${dataHour + 1}:00`;
  // debugger;
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            id={id}
            onCreate={onCreate}
            onDelete={onDelete}
            events={events}
          />
        );
      })}
    </div>
  );
};

export default Hour;
