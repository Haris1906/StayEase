import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { createguest, deleteguest, updateguests } from "./apiguests";
import { getSingleCabin, updateCabin, updateDateCabin } from "./apiCabins";
import { differenceInDays } from "date-fns";
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,cabins(name),guests(fullName,email)",
      { count: "exact" }
    );
  // This is a filter;
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  console.log("id", id);
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.checked-in,and(endDate.gte.${getToday()},endDate.lte.${getToday(
        { end: "end" }
      )}))`
    )
    .order("endDate", { ascending: true });

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const booking = await getBooking(id);
  const cabins = await getSingleCabin(booking.cabins.id);
  console.log(cabins[0].booked_from);
  const startDate = cabins[0].booked_from.filter((date) => {
    return differenceInDays(new Date(booking.startDate), new Date(date)) !== 0;
  });
  const endDate = cabins[0].booked_to.filter((date) => {
    return differenceInDays(new Date(booking.endDate), new Date(date)) !== 0;
  });
  const cabins1 = await updateDateCabin(booking.cabins.id, startDate, endDate);
  console.log(cabins1);
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([{ ...newBooking }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

export async function getBookingbyUser(guestId) {
  console.log("guestId", guestId);
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("guestId", guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return data;
}

export async function createBooking1(
  guestData,
  bookingData,
  cabindata,
  guestId,
  cabinId,
  role
) {
  try {
    let data;
    if (role === "admin") {
      data = await createguest(guestData);
      bookingData = { ...bookingData, guestId: data };
    } else {
      data = await updateguests(guestId, guestData);
    }
    const data1 = await createBooking(bookingData);
    if (!data1) {
      if (role === "admin") {
        await deleteguest(data);
      }
    }
    const data2 = await updateCabin(cabinId, cabindata);
    if (!data2) {
      if (role === "admin") {
        await deleteguest(data);
      }
      await deleteBooking(data1.id);
    }
    console.log("hello w2efwfwfhv");
    return data1;
  } catch (error) {
    console.error(error);
  }
}
