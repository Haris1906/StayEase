import styled from "styled-components";
import RatingComponent from "./RatingComponent";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useRatings } from "./useRatings";
import { useState } from "react";

const StyledDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 25rem;
  gap: 7px;
`;

const Button = styled.button`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  transition: all 0.3s;
  & svg {
    height: 2rem;
    width: 2rem;
  }
`;

export default function Rating() {
  const { ratings, isLoading } = useRatings();
  const [index, setIndex] = useState(0);
  if (isLoading) return <p>Loading...</p>;
  function handleLeft() {
    if (index === 0) return;
    setIndex(index - 3);
  }
  function handleRight() {
    if (index + 3 >= ratings.length) return;
    setIndex(index + 3);
  }

  if (!ratings.length) {
    return <p>No ratings to show at the moment</p>;
  }
  return (
    <StyledDiv>
      {ratings.length > 3 && (
        <Button onClick={handleLeft}>
          <HiChevronLeft />
        </Button>
      )}
      <RatingComponent
        rating={ratings[index].rating}
        description={ratings[index].description}
        fullName={ratings[index].guests.fullName}
      />
      {index + 1 <= ratings.length - 1 && (
        <RatingComponent
          rating={ratings[index + 1].rating}
          description={ratings[index + 1].description}
          fullName={ratings[index + 1].guests.fullName}
        />
      )}
      {index + 2 <= ratings.length - 1 && (
        <RatingComponent
          rating={ratings[index + 2].rating}
          description={ratings[index + 2].description}
          fullName={ratings[index + 2].guests.fullName}
        />
      )}
      {ratings.length > 3 && (
        <Button onClick={handleRight}>
          <HiChevronRight />
        </Button>
      )}
    </StyledDiv>
  );
}
