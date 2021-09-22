/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

type ResponseRecord = {
  id: string;
  response: string;
};

export const useSocket = () => {
  const client = new W3CWebSocket("ws://localhost:8080");
  const [responses, setResponses] = useState<ResponseRecord[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  let timer: NodeJS.Timeout;

  const connectToSocket = () => {
    client.onopen = () => {
      console.log("WebSocket client connected");
    };

    client.onmessage = ({ data }) => {
      setResponses(JSON.parse(data.toString()));
    };

    client.onclose = () => {
      timer = setTimeout(() => connectToSocket(), 1000);
    };

    client.onerror = (err) => {
      setErrorMessage(`Socket encountered error: ${err.message}`);
      client.close();
    };
  };

  useEffect(() => {
    connectToSocket();

    return () => {
      client.close();
      clearTimeout(timer);
    };
  }, []);

  return { client, responses, errorMessage };
};
