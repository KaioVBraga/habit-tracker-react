import React from "react";
import { Container } from "./styles";

interface Props {
    value: string;
    onChange: (e: React.FormEvent<Element>) => void;
}

const Deadend: React.FC<Props> = props => {
    return (
        <Container>
            Data Limite

            <input type="date" value={props.value} onChange={props.onChange} />
        </Container>
    );
};

export default Deadend;
