import styled from "styled-components";
import PropTypes from "prop-types";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, endDate } = activity;
  const time = endDate.split("T")[1];
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of a ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{time}</div>
      {status === "unconfirmed" && (
        <Button size="small" variant="primary" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

TodayItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number,
    endDate: PropTypes.string,
    guests: PropTypes.shape({
      fullName: PropTypes.string,
      countryFlag: PropTypes.string,
      country: PropTypes.string,
    }),
    numNights: PropTypes.number,
    status: PropTypes.string,
    checkIn: PropTypes.string,
    checkOut: PropTypes.string,
  }),
};

export default TodayItem;
