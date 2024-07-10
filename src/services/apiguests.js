import supabase from "./supabase";

export async function createguest(guest) {
  console.log(guest);
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...guest }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  return data[0].id;
}

export async function updateguests(id, guest) {
  const { data, error } = await supabase
    .from("guests")
    .update({ ...guest })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

export async function deleteguest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
