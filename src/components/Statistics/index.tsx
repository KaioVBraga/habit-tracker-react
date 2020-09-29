import React, { InputHTMLAttributes } from "react";

import { Container, Bar } from "./styles";

interface Props {
    className?: string;
}

const Statistics: React.FC<Props> = props => {
    return (
        <Container className={props.className}>
            <Bar percentage={100} />
            <Bar percentage={70} />
            <Bar percentage={30} />
            <Bar percentage={90} />
            <Bar percentage={70} />
            <Bar percentage={95} />
        </Container>
    );
};

export default Statistics;
