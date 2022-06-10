import styled from "@emotion/styled";
import React, { FC, memo, useEffect, useMemo, useState } from "react";

export default function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  let [numbers, setNumbers] = useState<number[]>([1, 2, 3]);
  let listItem: JSX.Element[] = numbers.map((n) => (
    <CodeList key={n} id={n} count={count} />
  ));
  let [nodes, setNodes] = useState<JSX.Element[]>(listItem);

  nodes = listItem;
  // ここの余剰な再レンダリングはなるべく控えたい
  useMemo(() => {
    setTimeout(() => {
      if (count < 145) {
        setCount(count + 0.5);
      } else {
        setCount(0);
      }
    }, 34);
  }, [count]);
  /**
   * onclickでのコード追加/削除イベント
   * 上の関数なしでは動かなかった。（再レンダリングされなかった）
   */
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
// 疑似乱数
const createFakeCodes = (): string => {
  const randomNum: number = Math.floor(Math.random() * 1000000);
  const organizedNum: string = ("000000" + randomNum).slice(-6);
  return organizedNum.slice(0, 3) + " " + organizedNum.slice(3, 6);
};

type Props = {
  id: number;
  count: number;
};
// コードのリスト（子要素）
const CodeList: FC<Props> = memo((props): JSX.Element => {
  const { id } = props;
  const [codes, setCodes] = useState<string>(createFakeCodes());
  // 10sごとに擬似乱数生成
  useEffect(() => {
    const intervalB: NodeJS.Timer = setInterval(() => {
      setCodes((c): string => createFakeCodes());
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
// ローダーのコンポーネント
const AfterPie = memo((): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  setTimeout(() => {
    // 10sかけてsvgのストロークが145に達するようにする
    if (count < 145) {
      setCount(count + 0.5);
    } else {
      setCount(0);
    }
  }, 9830 / (145 * 2));
  return (
    <>
      {/* <circle/>を使用。 */}
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
