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
  inGoal: boolean;
  beforeDeadend: boolean;
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
  inGoal,
  beforeDeadend,
  markationValue,
}) => {
  const cleanHabitDate = handleTimezone(new Date(habit.createdAt));
  const cleanDate = handleTimezone(new Date(day.date));

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  todayDate.setHours(
    todayDate.getHours() + (3 - todayDate.getTimezoneOffset() / 60)
  );

  const cleanToday = handleTimezone(todayDate);

  const isToday = cleanToday.brasil === cleanDate.brasil;

  if (isToday) {
    console.log("IN GOAL", inGoal);
  }

  const isDeadend = !!deadends
    .map((deadend: any) => handleTimezone(new Date(deadend.limit)).brasil)
    .find((deadend: any) => {
      return deadend === cleanDate.brasil;
    });

  if (isToday && inGoal && habit.qualitative !== 1) {
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

  if (isToday && inGoal && !day.value) {
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

    if (isToday && inGoal && habit.qualitative !== 1) {
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

  if (!inFrequency && day.inMonth) {
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
        <Tooltip>Dia fora da frequência de realização do hábito</Tooltip>
      </Popup>
    );
  }

  if (day.value !== 0) {
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
        <Tooltip>
          {parseInt(day.value * 100)}% do hábito foi executado no dia
        </Tooltip>
      </Popup>
    );
  }

  if (inGoal && !isToday) {
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
        <Tooltip>Hábito não realizado</Tooltip>
      </Popup>
    );
  }

  if (isDeadend) {
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
        <Tooltip>Data limite</Tooltip>
      </Popup>
    );
  }

  if (beforeDeadend) {
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
        <Tooltip>
          Dia que faz parte do escopo do hábito, mas que não foi atingido
        </Tooltip>
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
      <Tooltip>Dia fora do escopo do hábito</Tooltip>
    </Popup>
  );
};

export default Calendar;
