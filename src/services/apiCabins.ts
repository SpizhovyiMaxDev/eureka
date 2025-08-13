import { Cabin, EditCabin, NewCabin } from "../types/cabin";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Failed to load cabins");
  }

  return (data ?? []) as Cabin[];
}

export async function deleteCabin(id: number): Promise<void> {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Failed to delete cabin");
  }
}

export async function createCabin(cabin: NewCabin): Promise<Cabin> {
  const imageUrl = await resolveCabinImageUrl(cabin);
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imageUrl }])
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create cabin.");
  }

  return data as Cabin;
}

export async function editCabin(cabin: EditCabin): Promise<Cabin> {
  const imageUrl = await resolveCabinImageUrl(cabin);

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imageUrl })
    .eq("id", cabin.id)
    .select()
    .single();

  if (error) {
    throw new Error("Failed to edit cabin.");
  }

  return data as Cabin;
}

async function resolveCabinImageUrl(
  cabin: EditCabin | NewCabin
): Promise<string> {
  const isHoistedImage =
    typeof cabin.image === "string" && cabin.image.startsWith?.("https://");
  if (isHoistedImage) return cabin.image as string;

  const imageName = generateImageName(cabin);
  await uploadCabinImageToStorage(imageName, cabin.image);

  return `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
}

function generateImageName(cabin: EditCabin | NewCabin): string {
  return `${Math.random()}-${cabin.name}`.replaceAll("/", "");
}

async function uploadCabinImageToStorage(
  imageName: string,
  file: File | string
): Promise<void> {
  const { error } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, file);

  if (error) {
    throw new Error(
      "Cabin image could not be uploaded.\nPlease make sure that image is valid."
    );
  }
}
