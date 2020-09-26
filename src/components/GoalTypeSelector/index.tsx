import React, { useEffect, useState, useCallback } from "react";    
import { Container } from "./styles";

interface Props {
    handleCategory(category:string): void;
}

const Calendar: React.FC<Props> = props => {
    const categories = ['Saúde', 'Estudo', 'Trabalho', 'Desenvolvimento Pessoal'];

    return(
        <Container>
            <h1>
                Escolha o tipo
            </h1>
            <ul>
                {
                    categories.map( category => <li onClick={() => props.handleCategory(category)}>{category}</li>)
                }
            </ul>
        </Container>
    );
};

export default Calendar;
