import supabase from "./supabase";

export default async function getRatings() {
  const { data, error } = await supabase
    .from("Ratings")
    .select("*,guests(fullName)");

  if (error) {
    console.error(error);
    throw new Error("Ratings could not be loaded");
  }

  return data;
}

export async function createRating(rating) {
  const { error } = await supabase.from("Ratings").insert(rating);

  if (error) {
    console.error(error);
    throw new Error("Rating could not be created");
  }
}
