// src/app/core/models/category.models.ts
export class Category {
  id: number;
  name: string;
  description: string;
  parentId?: number;
  parent?: Category;
  children?: Category[];
  imageUrl: string;
}
