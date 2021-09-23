/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

type ResponseRecord = {
  id: string;
  response: string;
};

export const useSocket = () => {
  const client = new ReconnectingWebSocket(
    "wss://fathomless-cove-99421.herokuapp.com/",
    [],
    {
      connectionTimeout: 1000,
      maxRetries: 10,
    }
  );
  const [responses, setResponses] = useState<ResponseRecord[]>([]);

  useEffect(() => {
    client.addEventListener("open", () =>
      console.log("Webspcket client connected")
    );
    client.addEventListener("message", (event) => {
      setResponses(JSON.parse(event.data.toString()));
    });

    return () => client.close();
  }, []);

  return { client, responses };
};
