import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/core/models/category.models";
import { CategoryService } from "src/app/core/services/category.service";
import { ProductService } from "src/app/core/services/product.service";
import { Product } from '../../../core/models/product.models';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ProductListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  products: Product[] = [];


  constructor (private productService: ProductService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Home" }, { label: "Products", active: true }];

    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        console.log("products loaded:", this.products);
      },
      error: (err) => {
        console.error("Failed to load categories", err);
      }
    });

    console.log('cat: ', this.products)
  }

  editModal(i: number) {

  }

  deleteModal(i: number) {

  }
}
