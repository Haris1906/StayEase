import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useUser } from "../authentication/useUser";
import UserBookingRow from "./UserBookingRow";
import { useUserBooking } from "./useUserBooking";

export default function UserBookingTable() {
  const { user, isLoading1 } = useUser();
  console.log(user);
  console;
  const { isLoading, bookings } = useUserBooking(user?.user_metadata?.guestId);

  if (isLoading || isLoading1) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;
  return (
    <Menus>
      <Table columns="1fr 1.5fr 1.7fr 1.5fr 1.7fr 1.5fr 1.5fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>NUM_DAYS </div>
          <div>Start_Date</div>
          <div>Start_Time</div>
          <div>End_Date</div>
          <div>End_Time</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <UserBookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}
