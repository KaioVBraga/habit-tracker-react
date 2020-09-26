import React, { useEffect, useState, useCallback } from "react";    
import { Container } from "./styles";

interface Props {
    handleGoal(goal:string): void;
}

const GoalRegister: React.FC<Props> = props => {
    const categories = ['Saúde', 'Estudo', 'Trabalho', 'Desenvolvimento Pessoal'];

    return(
        <Container>
            <h1>
                Escolha o goal
            </h1>
            <ul>
                {
                    categories.map( category => <li onClick={() => props.handleGoal(category)}>{category}</li>)
                }
            </ul>
        </Container>
    );
};

export default GoalRegister;
