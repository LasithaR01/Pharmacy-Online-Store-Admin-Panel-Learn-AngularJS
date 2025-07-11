import { Component, OnInit } from "@angular/core";
import { productModel, productList } from "../product.model";
import { Options } from "ngx-slider-v2";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "src/app/core/services/product.service";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "src/app/core/services/category.service";
import { Category } from "src/app/core/models/category.models";
import { CartService } from "src/app/core/services/cart.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})

/**
 * Ecommerce products component
 */
export class ProductsNewComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  pricevalue: number = 100;
  minVal: number = 100;
  maxVal: number = 500;
  page: number = 1;

  priceoption: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number): string => {
      return "$" + value;
    },
  };
  log = "";
  discountRates: number[] = [];
  public products: productModel[] = [];
  public productTemp: productModel[] = [];
  categories: Category[] = [];
  filteredCategories: Category[] = [];

  constructor(
    private http: HttpClient,
    public toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Products", active: true },
    ];
    // this.products = Object.assign([], productList);

    // this.http.get<any>(`http://localhost:8000/api/products`)
    //   .subscribe((response) => {
    //     this.products = response.data;
    //   });
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log("data: ", data);
        this.products = data;
        // this.filteredProducts = [...this.products];
      },
      error: (err) => {
        console.error("Failed to load products", err);
        this.toastr.error("Failed to load products");
      },
    });
  }

  addToCart(product: productModel) {
    console.log('product to add: ', product)
    this.cartService.addToCart(product);
    this.toastr.success(`${product.name} added to cart`);
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.filteredCategories = [...this.categories];
      },
      error: (err) => {
        console.error("Failed to load categories", err);
        this.toastr.error("Failed to load categories");
      },
    });
  }

  searchFilter(e) {
    const searchStr = e.target.value;
    this.products = productList.filter((product) => {
      return product.name.toLowerCase().search(searchStr.toLowerCase()) !== -1;
    });
  }

  discountLessFilter(e, percentage) {
    if (e.target.checked && this.discountRates.length === 0) {
      this.products = productList.filter((product) => {
        return product.discount < percentage;
      });
    } else {
      this.products = productList.filter((product) => {
        return product.discount >= Math.max.apply(null, this);
      }, this.discountRates);
    }
  }

  discountMoreFilter(e, percentage: number) {
    if (e.target.checked) {
      this.discountRates.push(percentage);
    } else {
      this.discountRates.splice(this.discountRates.indexOf(percentage), 1);
    }
    this.products = productList.filter((product) => {
      return product.discount >= Math.max.apply(null, this);
    }, this.discountRates);
  }

  valueChange(value: number, boundary: boolean): void {
    if (boundary) {
      this.minVal = value;
    } else {
      this.maxVal = value;
      this.products = productList.filter(function (product) {
        return product.disRate <= value && product.disRate >= this;
      }, this.minVal);
    }
  }
}
