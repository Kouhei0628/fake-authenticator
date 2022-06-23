import styled from "@emotion/styled";
import React, { memo, useEffect } from "react";
import { useState } from "react";

// 10sかけてsvgのストロークが145に達するようにするローダー
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  tick() {
    if (this.state.count === 145) {
      this.setState(() => ({ count: 0 }));
    } else {
      this.setState((state) => ({ count: state.count + 0.5 }));
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10000 / (145 / 0.5));
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <SAfterPie
        cx="50%"
        cy="50%"
        r="22.5"
        style={{ strokeDasharray: `${this.state.count} 145` }}
      />
    );
  }
}

export default function App() {
  // 疑似乱数
  const createFakeCodes = () => {
    const randomNum = Math.floor(Math.random() * 1000000);
    const organizedNum = ("0" + randomNum).slice(-6);
    return organizedNum.slice(0, 3) + " " + organizedNum.slice(3, 6);
  };
  // コードのリスト（子要素）
  const CodeList = () => {
    const [codes, setCodes] = useState(createFakeCodes());

    // 10sごとに擬似乱数生成
    useEffect(() => {
      const intervalB = setInterval(() => {
        setCodes(() => createFakeCodes());
      }, 10000);
      return () => clearInterval(intervalB);
    }, []);

    return (
      <>
        <SCodeList>
          <p>Fake Code No.{numbers.length}</p>
          <SFlexBox>
            <SFakeCodes>{codes}</SFakeCodes>
            <SPies>
              <svg viewBox="0 0 90 90" style={{ fill: "none" }}>
                <Timer />
              </svg>
            </SPies>
          </SFlexBox>
        </SCodeList>
      </>
    );
  };
  let [numbers, setNumbers] = useState([1, 2, 3]);
  let listItem = numbers.map((n) => <CodeList key={n} id={n} />);
  let [nodes, setNodes] = useState(listItem);

  nodes = listItem;

  const onClickPush = () => {
    numbers.push(numbers.length + 1);
    nodes.push(<CodeList key={numbers.length + 1} id={numbers.length + 1} />);
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
            disabled={nodes.length ? false : true} // リストが空になったらbuttonをdisabled
            onClick={() => onClickPop()}>
            -
          </button>
          <button onClick={() => onClickPush()}>+</button>
        </SBtnWrap>
        {/* ここにリストを追加 */}
        <SCodeUl>{nodes}</SCodeUl>
      </SMainDiv>
    </>
  );
}

// style
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
  stroke-dasharray: 0 145;
`;
