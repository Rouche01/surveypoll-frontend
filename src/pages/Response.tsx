import React from "react";
import styled from "styled-components";
import { useSocket } from "../hooks/pollResponses";
import { Container } from "./Home";

const ResponseItem = styled.p`
  background-color: rgba(234, 232, 228, 0.7);
  border-radius: 3px;
  padding: 7px 12px;
`;

const Response: React.FC = () => {
  const { responses } = useSocket();

  return (
    <Container>
      <h2>Responses</h2>
      {responses.map(({ response, id }) => (
        <ResponseItem key={id}>{response}</ResponseItem>
      ))}
    </Container>
  );
};

export default Response;
