import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Div = styled.div`
  position: relative;
  display: flex;
  height: 30rem;
  width: 50rem;
  overflow: hidden;
  border-radius: 1rem;
`;
const Img = styled.img`
  position: absolute;
  width: 50rem;
  height: 32rem;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 0 1rem var(--color-grey-400);
  transition: transform 1s;
  ${(props) =>
    props.value &&
    css`
      transform: translateX(${props.value * 50}rem);
    `};
`;
export default function HotelPhoto() {
  const [index, setIndex] = useState(0);
  console.log(setIndex);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index) => (index + 1) % 5);
    }, 5000);

    return () => clearInterval(intervalId);
  });

  return (
    <Div>
      <Img value={0 - index} src={`/photo-${0}.jpg`} alt="logo" />

      <Img value={1 - index} src={`/photo-${1}.jpg`} alt="logo" />

      <Img value={2 - index} src={`/photo-${2}.jpg`} alt="logo" />

      <Img value={3 - index} src={`/photo-${3}.jpg`} alt="logo" />

      <Img value={4 - index} src={`/photo-${4}.jpg`} alt="logo" />
    </Div>
  );
}
