import React, { useState } from "react";
import styled from "styled-components";
import useWebSocket from "react-use-websocket";
import { Container } from "./Home";
import { useEffect } from "react";

const ResponseItem = styled.p`
  background-color: rgba(234, 232, 228, 0.7);
  border-radius: 3px;
  padding: 7px 12px;
`;

type ResponseRecord = {
  id: string;
  response: string;
};

const Response: React.FC = () => {
  const [responses, setResponse] = useState<ResponseRecord[]>([]);
  const { lastMessage } = useWebSocket(
    "wss://fathomless-cove-99421.herokuapp.com/",
    {
      onOpen: () => console.log("WebSocket connection opened"),
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    if (lastMessage) {
      console.log(JSON.parse(lastMessage.data));
      const convertedResponse = JSON.parse(
        lastMessage.data
      ) as ResponseRecord[];
      setResponse(convertedResponse);
    }
  }, [lastMessage]);

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
