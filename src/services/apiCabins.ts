import { Cabin } from "../types/cabin";
import supabase from "./supabase";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Failed to load cabins");
  }

  return (data ?? []) as Cabin[];
}

export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Failed to delete cabin");
  }
}
