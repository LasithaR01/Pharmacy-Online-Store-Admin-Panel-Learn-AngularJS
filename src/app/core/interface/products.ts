export interface Product {
  // sold: number;
  // images: string[];
  // subcategory: Subcategory[];
  // ratingsQuantity: number;
  // _id: string;
  // title: string;
  // slug: string;
  // description: string;
  // quantity: number;
  // price: number;
  // imageCover: string;
  // category: Category;
  // brand: Brand;
  // priceAfterDiscount: number;
  // ratingsAverage: number;
  // createdAt: string;
  // updatedAt: string;
  // offer: number;
  id: string;
  name: string;
  slug: string;
  categoryName: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
