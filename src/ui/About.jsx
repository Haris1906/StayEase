import styled from "styled-components";
import HotelPhoto from "./HotelPhoto";
import HotelDescription from "./HotelDescription";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  height: 32rem;
  max-width: 100rem;
  background-color: var(--color-grey-0);
  padding-left: 2rem;
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  gap: 2rem;
`;
export default function About() {
  return (
    <StyledDiv>
      <HotelPhoto />
      <HotelDescription />
    </StyledDiv>
  );
}
