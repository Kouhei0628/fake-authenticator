import { memo } from "react";
import styled from "@emotion/styled";
import { FakeCode10s, Timer } from "../App";

// コードのリスト（子要素）
export const CodeList = memo((props) => {
  const { id } = props;
  return (
    <>
      <SCodeLi>
        <p>Fake Code No.{id}</p>
        <SFlexBox>
          <SFakeCodes>
            <FakeCode10s />
          </SFakeCodes>
          <SPies>
            <svg viewBox="0 0 90 90" style={{ fill: "none" }}>
              <Timer />
            </svg>
          </SPies>
        </SFlexBox>
      </SCodeLi>
    </>
  );
});

const SFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SFakeCodes = styled.p`
  font-size: 42px;
  margin: 0;
`;
const SCodeLi = styled.li`
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
