import React from 'react';
import { months } from '../../utils/dateUtils';
import './header.scss';

const Header = ({ today, weekDates, nextWeek, prevWeek, openModal }) => {
  const week = weekDates.map((dayDate) => dayDate.getMonth());
  const oneMonth = week[0] === week[6]
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={openModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={today}>Today</button>
        <button className="icon-button navigation__nav-icon" onClick={prevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{oneMonth ? months[week[0]] : `${months[week[0]]}-${months[week[6]]}`}</span>
      </div>
    </header>
  );
};

export default Header;
