import React, { useEffect, useState, useCallback } from "react";    
import { Container, CalendarContainer } from "./styles";

const Calendar: React.FC = () => {
    const [days, setDays] = useState(Array(35).fill(0));
    const calendario = ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const date = new Date();
    const [months, setMonths] = useState([{ name: 'Janeiro', count: 31},
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
    { name: 'Dezembro', count: 31 },]);

    useEffect(() => {
        const actualCalendar = new Date();
        const firstOfMonth = actualCalendar.getDay() - (actualCalendar.getDate() % 7)  + 1 > 0 ? actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 1 : actualCalendar.getDay() - (actualCalendar.getDate() % 7) + 7 + 1

        const previousMonth = Array(months[actualCalendar.getMonth()-1].count).fill(null).map((something, index) => index+1).map(position => ({ position, value: 0, inMonth: false }));
        const actualMonth = Array(months[actualCalendar.getMonth()].count).fill(null).map((something, index) => index+1).map(position => ({ position, value: 0, inMonth: true }));
        const postMonth = Array(months[actualCalendar.getMonth()+1].count).fill(null).map((something, index) => index+1).map(position => ({ position, value: 0, inMonth: false }));

        const previousMonthSlice = previousMonth.slice(previousMonth.length-firstOfMonth, previousMonth.length);
        const postMonthSlice = postMonth.slice(0, 7-((firstOfMonth+previousMonth.length)%7) + 1);

        setDays(previousMonthSlice.concat(actualMonth).concat(postMonthSlice))

    }, [months]);

    
    const handleDays = useCallback((index) => {
        const newDays = [...days];
        if(newDays[index].inMonth) {
            newDays[index].value = 1;
            setDays(newDays);
        }
    }, [days]);

    return (
        <Container>
            <h2>{ months[date.getMonth()].name }</h2>
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
                            <div 
                                style={{ backgroundColor: days[index].value ===  1 ? '#68ce68' : '' }}
                                onClick={() => handleDays(index)}
                            >
                                {value.position}
                            </div>
                        )
                    })
                }
            </CalendarContainer>
        </Container>
    );
};

export default Calendar;
