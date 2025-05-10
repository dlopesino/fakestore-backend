type Result<T> = { ok: true; value: T } | { ok: false; error: string };

// Products
type ProductInput = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

interface ProductProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

interface GetAllProductsParams {
  limit: number;
  offset: number;
  category?: string;
}

// Users
type UserInput = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  image: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  image: string;
  password: string;
}
