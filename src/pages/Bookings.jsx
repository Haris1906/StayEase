import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import UserBookingTable from "../features/bookings/UserBookingTable";
import { useRole } from "../context/RoleContext";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background-color: var(--color-grey-0);
  padding: 1rem 2rem;
  border-radius: 10rem;
  width: 30rem;
  img {
    width: 2rem;
    height: 2rem;
  }
  input {
    border: none;
    background-color: var(--color-grey-0);
    font-size: 1.6rem;
    color: var(--color-grey-700);
    outline: none;
  }
  input::focus {
    outline: none;
  }
`;

function Bookings() {
  const { role } = useRole();
  const [name, setName] = useState("");
  function handleClick(value) {
    setName(value.target.value);
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          {role === "admin" ? "All bookings" : "My Bookings"}
        </Heading>
        <BookingTableOperations />
      </Row>

      {role === "admin" && (
        <Container>
          <img src="/search.svg" alt="search" />
          <input
            type="text"
            value={name}
            onChange={handleClick}
            placeholder="Search by name"
          />
        </Container>
      )}

      {role === "user" ? <UserBookingTable /> : <BookingTable search={name} />}
    </>
  );
}

export default Bookings;
