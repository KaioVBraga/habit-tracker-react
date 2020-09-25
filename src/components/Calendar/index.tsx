import React, { useEffect, useState, useCallback } from "react";    
import { Container, CalendarContainer, CalendarItem, IconLeft, IconRight } from "./styles";

const Calendar: React.FC = () => {
    const [days, setDays] = useState(Array(35).fill(0));
    const calendario = ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
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


    const monthSum = (someDate: Date, value: number) => {
        const newDate = new Date(someDate);
        newDate.setMonth(newDate.getMonth() + value);
        return newDate.getMonth();
    }

    useEffect(() => {
        const actualCalendar = date;
        const firstOfMonth = actualCalendar.getDay() - (actualCalendar.getDate() % 7)  + 1 > 0 ? actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 1 : actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 7 + 1

        const previousMonth = Array(months[monthSum(actualCalendar, -1)].count).fill(null).map((something, index) => index+1).map(position => ({ position, value: 0, inMonth: false }));
        const actualMonth = Array(months[actualCalendar.getMonth()].count).fill(null).map((something, index) => index+1).map(position => ({ position, value: 0, inMonth: true }));
        const postMonth = Array(months[monthSum(actualCalendar, 1)].count).fill(null).map((something, index) => index+1).map(position => ({ position, value: 0, inMonth: false }));

        const previousMonthSlice = previousMonth.slice(previousMonth.length-firstOfMonth, previousMonth.length);
        const postMonthSlice = postMonth.slice(0, 7-((firstOfMonth+previousMonth.length)%7) + 1);

        setDays(previousMonthSlice.concat(actualMonth).concat(postMonthSlice))

    }, [date, months, monthNumber]);

    
    const handleDays = useCallback((index) => {
        const newDays = [...days];
        if(newDays[index].inMonth) {
            newDays[index].value = 1;
            setDays(newDays);
        }
    }, [days]);

    const changeMonthNumber = useCallback((value) => {
        const newDate = date;
        newDate.setMonth(newDate.getMonth()+value);
        setDate(newDate);
        setMonthNumber(newDate.getMonth());
    }, [date]);

    return (
        <Container>
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
                        days.map((value, index) =>{
                            return(
                                <CalendarItem
                                    value={days[index].value}
                                    onClick={() => handleDays(index)}
                                >
                                    {value.position}
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
