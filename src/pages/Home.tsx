/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSocket } from "../hooks/pollResponses";
import { toast, ToastContainer } from "react-toastify";

interface ButtonProps {
  marginLeft?: number;
  color?: string;
}

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 70px;
  padding-bottom: 30px;
`;

const TextBox = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 14px 18px;
  border-radius: 7px;
  border: 1px solid gray;
  font-size: 1.1rem;
  &:focus {
    outline: none;
    border-color: palevioletred;
  }
  font-family: Arial, Helvetica, sans-serif;
`;

const Question = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button<ButtonProps>`
  padding: 0.6rem 1.4rem;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 5px;
  border: ${(props) => `2px solid ${props.color}`};
  background-color: ${(props) => props.color};
  color: white;
  margin-top: 15px;
  margin-left: ${(props) => `${props.marginLeft}px`};
  display: flex;
`;

const Home: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [responseQueue, setResponseQueue] = useState<string[]>([]);
  const history = useHistory();
  const { client } = useSocket();

  const blacklistWords = ["yes", "I don't know", "no", "that's fine"];

  const sendResponse = useCallback(() => {
    console.log(response);
    if (response.trim().length === 0) {
      toast("Can't submit empty response", {
        autoClose: 3500,
        type: "error",
        position: "top-center",
        theme: "colored",
      });
    } else if (blacklistWords.includes(response.trim().toLowerCase())) {
      toast("Invalid response", {
        autoClose: 3500,
        type: "error",
        position: "top-center",
        theme: "colored",
      });
    } else {
      if (client && client.readyState === 1) {
        client.send(response);
      } else {
        setResponseQueue([...responseQueue, response]);
      }
    }
  }, []);

  useEffect(() => {
    if (client.readyState === 1) {
      responseQueue.forEach((response) => client.send(response));
      setResponseQueue([]);
    }
  }, [client.readyState]);

  return (
    <Container>
      <Question>Is a hot dog a sandwich? Why?</Question>
      <TextBox
        rows={4}
        value={response}
        onChange={(ev) => setResponse(ev.currentTarget.value)}
      />
      <Flex>
        <Button onClick={sendResponse} color="palevioletred">
          Submit Response
        </Button>
        <Button
          onClick={() => history.push("/responses")}
          marginLeft={20}
          color="teal"
        >
          View Responses
        </Button>
      </Flex>
      <ToastContainer />
    </Container>
  );
};

export default Home;
