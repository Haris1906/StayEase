import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Heading from "./Heading";

const DIV = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function HotelDescription() {
  const { user } = useUser();
  console.log(user);
  return (
    <DIV>
      <Heading>Welcome {user.user_metadata.fullName}</Heading>
      <p>
        {
          "    Our hotel offers a luxurious retreat in the heart of Namakkal. Whether youre here for business meetings in our state-of-the-art conference facilities or leisurely exploring nearby attractions, our hotel promises a perfect blend of convenience and relaxation. Discover the Smhds commitment to excellence and hospitality, where every moment is craftedto exceed your expectations"
        }
      </p>
    </DIV>
  );
}
