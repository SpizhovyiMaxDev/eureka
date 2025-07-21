export type CabinCore = {
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
};

export type Cabin = CabinCore & {
  id: number;
  createdAt: string;
  image: string;
};

export type EditCabin = CabinCore & {
  id: number;
  image: File | string;
};

export type NewCabin = CabinCore & {
  image: File | string;
};

export type SubmitCabin = CabinCore & {
  image: FileList | string;
};
