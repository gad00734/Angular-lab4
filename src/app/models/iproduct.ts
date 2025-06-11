export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  stock: number;
  rating: {
    rate: number;
    count: number;
  };
}
