import React, { useState, useCallback } from "react";
import { Container, DayItem } from "./styles";

const Frequency: React.FC = () => {
    const [weekDays, setWeekDays] = useState([
        { symbol: 'D', marked: false },
        { symbol: 'S', marked: false },
        { symbol: 'T', marked: false },
        { symbol: 'Q', marked: false },
        { symbol: 'Q', marked: false },
        { symbol: 'S', marked: false },
        { symbol: 'S', marked: false }
    ]);

    const handleWeekDaysChange = useCallback((index) => {
        const newWeekDays = [...weekDays];
        newWeekDays[index].marked = !newWeekDays[index].marked;

        console.log(newWeekDays);

        setWeekDays(newWeekDays);
    }, [weekDays]);

    return (
        <Container>
            Frequência

            <ul>
                {
                    weekDays.map((day, index) =>
                        <DayItem
                            onClick={() => handleWeekDaysChange(index)}
                            marked={day.marked}
                        >
                            {day.symbol}
                        </DayItem>
                    )
                }
            </ul>
        </Container>
    );
};

export default Frequency;
