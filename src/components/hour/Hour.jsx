import React, { useState } from 'react';
import moment from 'moment';

import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';
import Modal from '../modal/Modal';


const Hour = ({ dataHour, hourEvents, removeEvent, id, onClose, onCreate, date }) => {
  const [isShow, setShow] = useState(false);

  const showModal = () => {
    setShow(!isShow)
  }
  const timeStart = dataHour < 10 ? `0${dataHour}:00` : `${dataHour}:00`;
  const timeEnd = dataHour < 9 ? `0${dataHour + 1}:00` : `${dataHour + 1}:00`;
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={showModal}>
      {isShow && (
        <Modal
          onCreate={onCreate}
          date={moment(date).format('YYYY-MM-DD')}
          timeStart={timeStart}
          endTime={timeEnd}
          onClose={onClose}>
          </Modal>
      )}
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
            removeEvent={removeEvent}
            id={id}
          />
        );
      })}
    </div>
  );
};

export default Hour;
