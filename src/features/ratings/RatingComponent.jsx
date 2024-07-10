import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  height: 25rem;
  gap: 15px;
  flex: 1;
  max-width: 30rem;
  padding: 2.5rem;
`;
const StyledDiv1 = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  p {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
const P = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-grey-700);
  padding-left: 1rem;
`;
import { Star } from "../../ui/StarRating";

export default function RatingComponent({ rating, description, fullName }) {
  return (
    <StyledDiv>
      <User>
        <img src={"/default-user.jpg"} alt="logo" />
        <p>{fullName}</p>
      </User>
      <StyledDiv1>
        {Array.from({ length: rating }, (_, i) => (
          <Star
            key={i}
            full={true}
            onRate={() => {}}
            onHoverIn={() => {}}
            onHoverOut={() => {}}
            color={"#fcc419"}
            size={25}
          />
        ))}
        <P>{rating}</P>
      </StyledDiv1>
      <p>{description}</p>
    </StyledDiv>
  );
}

RatingComponent.propTypes = {
  rating: PropTypes.number,
  description: PropTypes.string,
  fullName: PropTypes.string,
};
