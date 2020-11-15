import React, { useState, useCallback } from "react";
import { Container, DayItem } from "./styles";

interface Props {
    weekDays: { symbol: string, marked: boolean }[],
    handleWeekDaysChange: (index: number) => void
}

const Frequency: React.FC<Props> = props => {
    return (
        <Container>
            Frequência

            <ul>
                {
                    props.weekDays.map((day, index) =>
                        <DayItem
                            onClick={() => props.handleWeekDaysChange(index)}
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
