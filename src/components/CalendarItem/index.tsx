// @ts-nocheck
import React, { useEffect, useState, useCallback, FormEvent } from "react";
import Popup from "reactjs-popup";
// import Modal from 'react-modal';
import { CalendarItem, Tooltip } from "./styles";
import { handleTimezone } from "../../services/utils";

interface Props {
  habit: any;
  day: any;
  handleDays: any;
  handleClosePopup: any;
  handleMarkationValueChange: any;
  inFrequency: boolean;
  markationValue: any;
}

const Calendar: React.FC<Props> = ({
  habit,
  day,
  deadends,
  handleDays,
  handleClosePopup,
  handleMarkationValueChange,
  inFrequency,
  markationValue,
}) => {
  const cleanHabitDate = handleTimezone(new Date(habit.createdAt));
  const cleanDate = handleTimezone(new Date(day.date));
  const cleanToday = handleTimezone(new Date());

  const isToday = cleanToday.brasil === cleanDate.brasil;

  const inGoal =
    cleanHabitDate.date.valueOf() <= cleanDate.date.valueOf() &&
    cleanDate.date.valueOf() < cleanToday.date.valueOf();

  const isDeadend = !!deadends
    .map((deadend: any) => handleTimezone(new Date(deadend.limit)).brasil)
    .find((deadend: any) => {
      return deadend === cleanDate.brasil;
    });

  if (isToday && habit.qualitative !== 1) {
    return (
      <Popup
        trigger={
          <div>
            <Popup
              trigger={
                <CalendarItem
                  value={day.value / habit.base}
                  inMonth={day.inMonth}
                  isToday={isToday}
                  isDeadend={isDeadend}
                  inGoal={inGoal}
                  inFrequency={inFrequency}
                >
                  {day.position}
                </CalendarItem>
              }
              onClose={handleClosePopup}
              position={"top center"}
            >
              <div
                style={{
                  height: "100px",
                  width: "100px",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Base: {habit.base}</label>
                <input
                  type="number"
                  value={markationValue}
                  onChange={handleMarkationValueChange}
                  style={{
                    width: "90%",
                    margin: "1rem auto 0 auto",
                  }}
                />
              </div>
            </Popup>
          </div>
        }
        on={["hover"]}
        position={"top center"}
      >
        <Tooltip>Marcar como feito</Tooltip>
      </Popup>
    );
  }

  if (isToday && !day.value) {
    if (habit.qualitative !== 1) {
      return (
        <Popup
          trigger={
            <div>
              <Popup
                trigger={
                  <CalendarItem
                    value={day.value / habit.base}
                    inMonth={day.inMonth}
                    isToday={isToday}
                    isDeadend={isDeadend}
                    inGoal={inGoal}
                    inFrequency={inFrequency}
                  >
                    {day.position}
                  </CalendarItem>
                }
                onClose={handleClosePopup}
                position={"top center"}
              >
                <div
                  style={{
                    height: "100px",
                    width: "100px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Base: {habit.base}</label>
                  <input
                    type="number"
                    value={markationValue}
                    onChange={handleMarkationValueChange}
                    style={{
                      width: "90%",
                      margin: "1rem auto 0 auto",
                    }}
                  />
                </div>
              </Popup>
            </div>
          }
          on={["hover"]}
          position={"top center"}
        >
          <Tooltip>Marcar como feito</Tooltip>
        </Popup>
      );
    }

    if (isToday && habit.qualitative !== 1) {
      return (
        <Popup
          trigger={
            <CalendarItem
              value={day.value / habit.base}
              inMonth={day.inMonth}
              isToday={isToday}
              isDeadend={isDeadend}
              inGoal={inGoal}
              inFrequency={inFrequency}
            >
              {day.position}
            </CalendarItem>
          }
          onClose={handleClosePopup}
          position={"top center"}
        >
          <div
            style={{
              height: "100px",
              width: "100px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Base: {habit.base}</label>
            <input
              type="number"
              value={markationValue}
              onChange={handleMarkationValueChange}
              style={{
                width: "90%",
                margin: "1rem auto 0 auto",
              }}
            />
          </div>
        </Popup>
      );
    }

    return (
      <Popup
        trigger={
          <CalendarItem
            value={day.value}
            inMonth={day.inMonth}
            isToday={isToday}
            isDeadend={isDeadend}
            inGoal={inGoal}
            inFrequency={inFrequency}
            onClick={handleDays}
          >
            {day.position}
          </CalendarItem>
        }
        on={["hover"]}
        position={"top center"}
      >
        <Tooltip>Marcar como feito</Tooltip>
      </Popup>
    );
  }

  return (
    <CalendarItem
      value={day.value}
      inMonth={day.inMonth}
      isToday={isToday}
      isDeadend={isDeadend}
      inGoal={inGoal}
      inFrequency={inFrequency}
      onClick={handleDays}
    >
      {day.position}
    </CalendarItem>
  );
};

export default Calendar;
