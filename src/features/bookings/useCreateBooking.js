import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBooking1 } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isLoading: iscreating, mutate: createBooking } = useMutation({
    mutationFn: ({
      guestData,
      bookingData,
      cabindata,
      guestId,
      cabinId,
      role,
    }) => {
      createBooking1(guestData, bookingData, cabindata, guestId, cabinId, role);
    },

    onSuccess: () => {
      toast.success("Booking successfully created");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      }, 700);
      queryClient.invalidateQueries({ queryKey: ["bookingbyUser"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { iscreating, createBooking };
}
