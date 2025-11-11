export type SuppliersTypes = {
  id: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address?: string;
  products?: string;
  status?: "Aktiv" | "Inaktiv";
};
