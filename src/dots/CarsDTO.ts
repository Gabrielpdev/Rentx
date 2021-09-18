export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: {
    period: number;
    price: number;
  };
  fuel_type: string;
  thumbnail: string;
  accessories: {
    type: string;
    name: string;
  }[];
  photos: string[];
}