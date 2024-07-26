import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Heading from "./Heading";
import { FaLocationDot } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";

const DIV = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-right: 2rem;
`;

const P = styled.p`
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const Div1 = styled.div`
  display: flex;
  margin-top: 1rem;
  position: relative;
`;

const Div2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const Span = styled.span`
  margin-left: 7rem;
`;

export default function HotelDescription() {
  const { user } = useUser();
  console.log(user);
  return (
    <DIV>
      <Heading>Welcome, {user.user_metadata.fullName}</Heading>
      <p>
        <Span>Our hotel offers a luxurious retreat</Span> in the heart of
        Namakkal. Whether youre here for business meetings in our
        state-of-the-art conference facilities or leisurely exploring nearby
        attractions, our hotel promises a perfect blend of convenience and
        relaxation
      </p>
      <Div1>
        <FaLocationDot />
        <P>280/158, Salem Main Road Near 4 Theaters, Namakkal 637001</P>
      </Div1>

      <Div2>
        <FaSquarePhone />
        <P>04286 220 220</P>
      </Div2>
    </DIV>
  );
}
