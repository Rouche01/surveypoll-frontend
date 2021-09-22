/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

type ResponseRecord = {
  id: string;
  response: string;
};

// let connectionRetries = 5;

export const useSocket = () => {
  const client = new W3CWebSocket("ws://fathomless-cove-99421.herokuapp.com/");
  const [responses, setResponses] = useState<ResponseRecord[]>([]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket client connected");
    };
    client.onmessage = ({ data }) => {
      setResponses(JSON.parse(data.toString()));
    };
    // client.onerror = () => {
    //   if(client.readyState === 3) {
    //     connectionRetries--;
    //     if (connectionRetries > 0) {
    //       const timer = 
    //     }
    //   }
    // }

    return () => client.close();
  }, []);

  return { client, responses };
};
