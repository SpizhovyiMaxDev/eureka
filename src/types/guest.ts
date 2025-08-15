export type GuestCore = {
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
};

export type Guest = GuestCore & {
  id?: number;
  createdAt?: string;
};
