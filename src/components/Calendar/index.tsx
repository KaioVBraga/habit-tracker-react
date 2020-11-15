import React, { useEffect, useState, useCallback, FormEvent } from "react";    
import Popup from 'reactjs-popup';
import { Container, CalendarContainer, CalendarItem, IconLeft, IconRight } from "./styles";
import api from '../../services/api';

interface Props {
    habit?: any;
    deadends: {
        id: number;
        limit: string;
        accomplished: boolean | null;
        goal_id: number;
        createdAt: string;
        udpatedAt: string;
    }[];
    className?: string;
}

const Calendar: React.FC<Props> = props => {
    const [days, setDays] = useState(Array(35).fill(0));
    const [months, setMonths] = useState(
        [
            { name: 'Janeiro', count: 31},
            { name: 'Fevereiro', count: 28},
            { name: 'Março', count: 31},
            { name: 'Abril', count: 30},
            { name: 'Maio', count: 31 },
            { name: 'Junho', count: 30 },
            { name: 'Julho', count: 31 },
            { name: 'Agosto', count: 31 },
            { name: 'Setembro', count: 30 },
            { name: 'Outubro', count: 31 },
            { name: 'Novembro', count: 30 },
            { name: 'Dezembro', count: 31 }
        ]
    );
    const [date, setDate] = useState( new Date());
    const [monthNumber, setMonthNumber] = useState( new Date().getMonth());
    const [markationValue, setMarkationValue] = useState(1);


    const monthSum = (someDate: Date, value: number) => {
        const newDate = new Date(someDate);
        newDate.setMonth(newDate.getMonth() + value);
        return newDate.getMonth();
    }

    useEffect(() => {
        if(props.habit) {
            console.log('HABIT', props.habit);

            const doubleDigit = (num:number) => {
                return `${num < 10 ? '0' + num : num}`;
            };

            const markedDays = props.habit.marks.map((mark:any) => ({ 
                date: new Date(mark.createdAt).toLocaleDateString(), 
                markation: mark.markation
            }));

            const setPosition = (position:number, month:number, inMonth:boolean) => {
                const date = `${doubleDigit(month)}/${doubleDigit(position)}/${monthSum(actualCalendar, -1) === 11 ? actualCalendar.getFullYear() - 1 : actualCalendar.getFullYear()}`;
                const mark = markedDays.length > 0 ? markedDays.find((mark:any) => mark.date===date) || { markation: 0 } : { markation: 0 };


                console.log("MARKED DAYS", markedDays);
                console.log('DATE', date);

                return { 
                    position, 
                    value: mark.markation, 
                    inMonth, 
                    date
                };
            }

            const actualCalendar = date;
            const firstOfMonth = actualCalendar.getDay() - (actualCalendar.getDate() % 7)  + 1 > 0 ? actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 1 : actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 7 + 1

            console.log(props.habit);

            const previousMonth = Array(months[monthSum(actualCalendar, -1)].count).fill(null)
                .map((something, index) => index+1)
                .map((position:number) => setPosition(position, monthSum(actualCalendar, -1)+1, false));
            const actualMonth = Array(months[actualCalendar.getMonth()].count).fill(null)
                .map((something, index) => index+1)
                .map((position:number) => setPosition(position, actualCalendar.getMonth()+1, true));
            const postMonth = Array(months[monthSum(actualCalendar, 1)].count).fill(null)
                .map((something, index) => index+1)
                .map((position:number) => setPosition(position, monthSum(actualCalendar, 1)+1, false));

            const previousMonthStart = previousMonth.length-firstOfMonth;
            const previousMonthEnd = firstOfMonth % 7 && previousMonth.length;
            const previousMonthSlice = previousMonth.slice(previousMonthStart, previousMonthEnd);

            const postMonthStart = 0;
            const postMonthSliceEnd = 42 - (actualMonth.length + previousMonthSlice.length)
            const postMonthSlice = postMonth.slice(postMonthStart, postMonthSliceEnd);

            const allDays = previousMonthSlice.concat(actualMonth).concat(postMonthSlice);

            console.log('ALL DAYS', allDays);

            setDays(allDays)
        }
    }, [date, months, monthNumber, props.habit]);

    
    const handleDays = useCallback((index:number, isToday:boolean, inFrequency:boolean, markation:number) => {
        const newDays = [...days];
        if(isToday && inFrequency) {  
            const userString = localStorage.getItem('habit_user') || '';
            const user = JSON.parse(userString);
            
            api
                .post(
                    `/users/${user.id}/goals/${props.habit.goal_id}/habits/${props.habit.id}/marks`, 
                    { markation }
                );

            newDays[index].value = markation;
            setDays(newDays);
        }
    }, [days, props.habit]);

    const handleMarkationValueChange = useCallback((e:FormEvent) => {
        if(props?.habit?.base) {
            const value = Number((e.target as HTMLInputElement).value);
        
            if(value < 0) {
                setMarkationValue(0);
                return;
            }

            if(value > props.habit.base) {
                setMarkationValue(props.habit.base);
                return;
            }
            
            setMarkationValue(value);
        }
    }, [props.habit]);

    const handleClosePopup = useCallback((index:number) => {
        handleDays(index, true, true, markationValue);
    }, [markationValue]);

    const changeMonthNumber = useCallback((value) => {
        const newDate = date;
        newDate.setMonth(newDate.getMonth()+value);
        setDate(newDate);
        setMonthNumber(newDate.getMonth());
    }, [date]);

    if(!props.habit || !props.deadends) {
        return null;
    }

    return (
        <Container className={props.className}>
            <IconLeft onClick={() => changeMonthNumber(-1)} />
            <section>
                <h2>{ months[monthNumber].name } { date.getFullYear() }</h2>
                <ul>
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <CalendarContainer>
                    {
                        days.map((day, index) =>{
                            const isToday = day.inMonth && day.position === date.getDate() && new Date().getMonth() === monthNumber && new Date().getFullYear() === date.getFullYear();
                            const cleanHabitDate = new Date(new Date(props.habit.createdAt).toLocaleDateString());
                            const cleanDate = new Date(day.date);
                            const cleanToday = new Date(new Date().toLocaleDateString());
                            const inGoal = cleanHabitDate < cleanDate && cleanDate < cleanToday;
                            const isDeadend = !!props.deadends
                                .map(deadend => {
                                    const [deadendYear, deadendMonth, rest] = deadend.limit.split('-');
                                    const [deadendDay] = rest.split('T'); 
                                    return new Date(`${deadendMonth}/${deadendDay}/${deadendYear}`);
                                })
                                .find(deadend => {
                                    return deadend.valueOf() === cleanDate.valueOf()
                                });
                            
                            const inFrequency = props.habit.frequency.includes(index%7);
                            
                            if(isToday) {
                                if(props.habit.qualitative !== 1) {
                                    return (
                                        <Popup 
                                            trigger={
                                                <CalendarItem
                                                    value={day.value/props.habit.base}
                                                    inMonth={day.inMonth}
                                                    isToday={isToday}
                                                    isDeadend={isDeadend}
                                                    inGoal={inGoal}
                                                    inFrequency={inFrequency}
                                                >
                                                    {day.position}
                                                </CalendarItem>
                                            }
                                            onClose={() => handleClosePopup(index)}
                                            position={"top center"}
                                        >
                                            <div
                                                style={{
                                                    height: '100px',
                                                    width: '100px',
                                                    backgroundColor: 'white',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <label>Base: {props.habit.base}</label>
                                                <input 
                                                    type="number" 
                                                    value={markationValue} 
                                                    onChange={handleMarkationValueChange}
                                                    style={{
                                                        width: '90%',
                                                        margin: '1rem auto 0 auto'
                                                    }}
                                                />
                                            </div>
                                        </Popup>
                                    )
                                }
                            }

                            return(
                                <CalendarItem
                                    value={day.value}
                                    inMonth={day.inMonth}
                                    isToday={isToday}
                                    isDeadend={isDeadend}
                                    inGoal={inGoal}
                                    inFrequency={inFrequency}
                                    onClick={() => handleDays(index, isToday, inFrequency, 1)}
                                >
                                    {day.position}
                                </CalendarItem>
                            )
                        })
                    }
                </CalendarContainer>
            </section>
            <IconRight onClick={() => changeMonthNumber(1)} />
        </Container>
    );
};

export default Calendar;
