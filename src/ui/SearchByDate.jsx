import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import { useState } from "react";
const StyledDiv = styled.div`
  display: flex;
  gap: 3rem;
  max-width: 100rem;
`;
const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;
const P = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-700);
`;
export default function SearchByDate() {
  const [searchParams, setSearchParams] = useSearchParams();
  let startDate = searchParams.get("startDate") || "";
  let endDate = searchParams.get("endDate") || "";
  const [minDate, setMinDate] = useState(startDate);
  function handleClick(value) {
    startDate = value.target.value;
    setMinDate(startDate);
    searchParams.set("startDate", value.target.value);
    setSearchParams(searchParams);
  }
  function handleClick1(value) {
    endDate = value.target.value;
    searchParams.set("endDate", value.target.value);
    setSearchParams(searchParams);
  }
  return (
    <StyledDiv>
      <Container>
        <P>Start Date:</P>
        <Input type="datetime-local" value={startDate} onChange={handleClick} />
      </Container>

      <Container>
        <P>End Date:</P>
        <Input
          type="datetime-local"
          value={endDate}
          onChange={handleClick1}
          min={minDate}
        />
      </Container>
    </StyledDiv>
  );
}
