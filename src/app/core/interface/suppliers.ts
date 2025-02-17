
export interface Supplier {
  id: string; // Unique identifier for the supplier
  name: string; // Name of the supplier
  slug: string; // URL-friendly version of the supplier's name
  contactNumber: string; // Contact number of the supplier
  address: string; // Address of the supplier
  description?: string; // Optional description of the supplier
  createdAt: string; // Timestamp when the supplier was created
  updatedAt: string; // Timestamp when the supplier was last updated
  category?: Category; // Optional category associated with the supplier
  products?: Product[]; // Optional list of products supplied by this supplier
}

export interface Category {
  id: string; // Unique identifier for the category
  name: string; // Name of the category
  slug: string; // URL-friendly version of the category name
  description: string; // Description of the category
  image: string; // Image URL for the category
}

export interface Product {
  id: string; // Unique identifier for the product
  name: string; // Name of the product
  slug: string; // URL-friendly version of the product name
  categoryName: string; // Name of the category the product belongs to
  price: number; // Price of the product
  quantity: number; // Available quantity of the product
  description: string; // Description of the product
  imageCover: string; // Cover image URL for the product
  supplier?: Supplier; // Optional supplier of the product
}
