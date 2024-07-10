import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
}

export async function getSingleCabin(id) {
  const { data, error } = await supabase.from("cabins").select().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }

  return data;
}

export async function updateCabin(id, newCabin) {
  console.log(newCabin, id);
  const data1 = await getSingleCabin(id);
  const startDate = data1[0].booked_from
    ? [...data1[0].booked_from, newCabin.booked_from]
    : [newCabin.booked_from];
  const endDate = data1[0].booked_to
    ? [...data1[0].booked_to, newCabin.booked_to]
    : [newCabin.booked_to];
  const { data, error } = await supabase
    .from("cabins")
    .update({
      booked_from: startDate,
      booked_to: endDate,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

export async function updateDateCabin(id, startDate, endDate) {
  console.log(startDate, endDate);
  const { data, error } = await supabase
    .from("cabins")
    .update({
      booked_from: startDate,
      booked_to: endDate,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}
