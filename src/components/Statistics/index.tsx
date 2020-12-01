import React, { useEffect, useState } from "react";

import { Container, BarsContainer, DescriptionContainer } from "./styles";
import api from '../../services/api';
import { useSelector } from 'react-redux';

interface Props {
    className?: string;
}

const Statistics: React.FC<Props> = props => {
    const [stats, setStats] = useState<any>({});
    const { habit } = useSelector((state: any) => {
        const goalIndex = state?.activeHabit?.goalIndex;
        const habitIndex = state?.activeHabit?.habitIndex;
        const goal = state?.goals[goalIndex]

        if (goal) {
            const habit = goal?.habits[habitIndex];
            return ({
                habit
            });
        }

        return ({
            habit: null
        });
    });

    useEffect(() => {
        if (habit) {
            const userString = localStorage.getItem('habit_user') || '';
            const user = JSON.parse(userString);

            api
                .get(`/users/${user.id}/goals/${habit.goal_id}/habits/${habit.id}/statistics`)
                .then(res => {
                    console.log('STATITICS', res.data);

                    setStats(res.data);
                });
        }
    }, [habit]);

    if (!habit || (!stats.biggerStreak && stats.biggerStreak !== 0)) {
        return null;
    }

    return (
        <Container className={props.className}>
            <DescriptionContainer>
                <tr>
                    <td>Maior sequência:</td>
                    <td>{stats.biggerStreak} dias seguidos</td>
                </tr>

                <tr>
                    <td>Total de dias em que o hábito foi praticado:</td>
                    <td>{stats.totalCommitedDays} dias</td>
                </tr>

                <tr>
                    <td>Total de dias de duração do hábito:</td>
                    <td>{stats.totalDays} dias</td>
                </tr>

                <tr>
                    <td>Dias passados desde a criação do hábito:</td>
                    <td>{stats.actualDays} dias</td>
                </tr>

                <tr>
                    <td>Porcentagem de realização total:</td>
                    <td>{stats.totalPercentage}%</td>
                </tr>

                <tr>
                    <td>Porcentagem de realização relativa:</td>
                    <td>{stats.actualPercentage}%</td>
                </tr>
            </DescriptionContainer>

            {/* <BarsContainer>
                 <Bar percentage={100} />
                <Bar percentage={70} />
                <Bar percentage={30} />
                <Bar percentage={90} />
                <Bar percentage={70} />
                <Bar percentage={95} /> 
            </BarsContainer> */}
        </Container>
    );
};

export default Statistics;
