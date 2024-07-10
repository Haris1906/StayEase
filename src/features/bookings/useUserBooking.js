import { useQuery } from "@tanstack/react-query";
import { getBookingbyUser } from "../../services/apiBookings";

export function useUserBooking(id) {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookingbyUser"],
    queryFn: () => getBookingbyUser(id),
  });

  return { isLoading, error, bookings };
}
