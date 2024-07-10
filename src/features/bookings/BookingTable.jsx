import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import PropTypes from "prop-types";
function BookingTable({ search }) {
  const { isLoading, bookings: initialbookings, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!initialbookings.length) return <Empty resourceName="bookings" />;
  console.log("initialbookings", initialbookings);

  const bookings = initialbookings.filter((booking) => {
    if (!search) return true;
    return booking.guests.fullName.toLowerCase().includes(search.toLowerCase());
  });

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        {!search && (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        )}
      </Table>
    </Menus>
  );
}

BookingTable.propTypes = {
  search: PropTypes.string,
};

export default BookingTable;
