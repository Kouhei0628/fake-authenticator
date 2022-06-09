import styled from "@emotion/styled";
import { FC, memo, useEffect, useMemo, useState } from "react";
import React from "react";

export default function App() {
  const [count, setCount] = useState<number>(0);
  let [numbers, setNumbers] = useState<number[]>([1, 2, 3]);
  let listItem: JSX.Element[] = numbers.map((n) => (
    <CodeList key={n} id={n} count={count} />
  ));
  let [nodes, setNodes] = useState<JSX.Element[]>(listItem);

  nodes = listItem;

  useMemo(() => {
    setTimeout(() => {
      if (count < 145) {
        setCount(count + 0.5);
      } else {
        setCount(0);
      }
    }, 32);
  }, [count]);
  const onClickPush = () => {
    numbers.push(numbers.length + 1);
    nodes.push(
      <CodeList
        key={numbers.length + 1}
        id={numbers.length + 1}
        count={count}
      />
    );
    setNumbers(numbers);
    setNodes(nodes);
  };
  const onClickPop = () => {
    numbers.pop();
    setNumbers(numbers);
    nodes.pop();
    setNodes(nodes);
  };
  return (
    <>
      <SMainDiv>
        <SMainTitle>Fake Authenticator</SMainTitle>
        <SBtnWrap>
          <button
            disabled={nodes.length ? false : true}
            onClick={() => onClickPop()}>
            -
          </button>
          <button onClick={() => onClickPush()}>+</button>
        </SBtnWrap>
        <SCodeUl>{nodes}</SCodeUl>
      </SMainDiv>
    </>
  );
}

const createFakeCodes = (): string => {
  const randomNum = Math.floor(Math.random() * 1000000);
  const organizedNum = ("000000" + randomNum).slice(-6);
  return organizedNum.slice(0, 3) + " " + organizedNum.slice(3, 6);
};

type Props = {
  id: number;
  count: number;
};

const CodeList: FC<Props> = memo((props) => {
  const { id, count } = props;
  const [codes, setCodes] = useState<string>(createFakeCodes());

  useEffect(() => {
    const intervalB = setInterval(() => {
      setCodes((c) => createFakeCodes());
    }, 10000);
    return () => clearInterval(intervalB);
  }, []);

  return (
    <>
      <SCodeList>
        <p>Fake Code No.{id}</p>
        <SFlexBox>
          <SFakeCodes>{codes}</SFakeCodes>
          <SPies>
            <svg viewBox="0 0 90 90" style={{ fill: "none" }}>
              <AfterPie />
            </svg>
          </SPies>
        </SFlexBox>
      </SCodeList>
    </>
  );
});
const AfterPie = memo(() => {
  const [count, setCount] = useState(0);
  setTimeout(() => {
    if (count < 145) {
      setCount(count + 0.5);
    } else {
      setCount(0);
    }
  }, 32);
  return (
    <>
      <SAfterPie
        cx="50%"
        cy="50%"
        r="22.5"
        style={{ strokeDasharray: `${count} 145` }}
      />
    </>
  );
});
const SMainDiv = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 85%;
  margin: 0 auto;
`;
const SMainTitle = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  width: 100%;
  font-size: 34px;
`;
const SBtnWrap = styled.div`
  width: 100%;
  text-align: center;
`;
const SCodeUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const SFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SFakeCodes = styled.p`
  font-size: 42px;
  margin: 0;
`;
const SCodeList = styled.li`
  border-top: 1px solid black;
  margin-bottom: 20px;
  &:first-of-type {
    border-top: none;
  }
`;
const SPies = styled.div`
  margin-right: 20px;
  display: inline-block;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  position: relative;
`;

const SAfterPie = styled.circle`
  transform: rotate(-90deg);
  transform-origin: center;
  stroke: #ff4564;
  stroke-width: 45;
`;
