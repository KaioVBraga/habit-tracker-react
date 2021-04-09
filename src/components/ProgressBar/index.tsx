import React from "react";

import { Container, ProgressBar } from "./styles";

interface Props {
  progress: number;
}

const Progress: React.FC<Props> = ({ progress }) => {
  return (
    <Container progress={progress}>
      <ProgressBar progress={progress} />
      <span>{progress >= 100 ? 100 : progress.toFixed(2)}%</span>
    </Container>
  );
};

export default Progress;
