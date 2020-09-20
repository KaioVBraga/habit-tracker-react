import React, { InputHTMLAttributes } from "react";

import { Container, Bar } from "./styles";

const Statistics: React.FC = () => {
    return (
        <Container>
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
