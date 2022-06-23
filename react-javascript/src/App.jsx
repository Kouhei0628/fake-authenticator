import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import { CodeList } from "./components/CodeList";

// 10sかけてsvgのストロークが145に達するようにするローダー
export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  tick() {
    if (this.state.count < 145) {
      this.setState((state) => ({ count: state.count + 0.5 }));
    } else {
      this.setState(() => ({ count: 0 }));
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

// 10sごとに擬似乱数生成
export class FakeCode10s extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeCode: createFakeCodes(),
    };
  }
  changeFakeCode() {
    this.setState({ fakeCode: createFakeCodes() });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.changeFakeCode(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return this.state.fakeCode;
  }
}
// 疑似乱数
const createFakeCodes = () => {
  const randomNum = Math.floor(Math.random() * 1000000);
  const organizedNum = ("0" + randomNum).slice(-6);
  return organizedNum.slice(0, 3) + " " + organizedNum.slice(3, 6);
};

export default function App() {
  /** @type number[] */
  const number = useRef([1, 2, 3]);
  const initList = number.current.map((num) => <CodeList key={num} id={num} />);
  /** @type object[] */
  let [codeElementList, setCodeElementList] = useState(initList);
  codeElementList = initList;

  const onClickPush = () => {
    const newNumbers = number.current.push(number.current.length + 1);
    const newCodeElementList = codeElementList.push(
      <CodeList key={newNumbers} id={newNumbers} />
    );
    setCodeElementList(newCodeElementList);
  };

  const onClickPop = () => {
    number.current.pop();
    const newCodeElementList = codeElementList.pop();
    setCodeElementList(newCodeElementList);
  };

  return (
    <>
      <SMainDiv>
        <SMainTitle>Fake Authenticator</SMainTitle>
        <SBtnWrap>
          <button
            onClick={() => onClickPop()}
            disabled={number.current.length ? false : true}>
            -
          </button>
          <button onClick={() => onClickPush()}>+</button>
        </SBtnWrap>
        {/* ここにリストを追加 */}
        <SCodeUl>{codeElementList}</SCodeUl>
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

const SAfterPie = styled.circle`
  transform: rotate(-90deg);
  transform-origin: center;
  stroke: #ff4564;
  stroke-width: 45;
  stroke-dasharray: 0 145;
`;
