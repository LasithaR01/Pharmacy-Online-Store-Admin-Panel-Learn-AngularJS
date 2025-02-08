import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDataService } from 'src/app/core/category.service';
import { ProductsDataService } from 'src/app/core/product.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  productData = {
    name: '',
    categoryId: '', // Holds the selected category
    description: '',
    price: 0,
    stocks: 0,
    expiry: ''
  };

  categories: any[] = []; // Holds category data
  isEditMode: boolean = false; // Flag for edit mode

  constructor(
    private productService: ProductsDataService,
    private categoryService: CategoryDataService,
    private router: Router,
    private route: ActivatedRoute // For accessing route parameters
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    // Check if we're in edit mode (by checking the category ID in the route params)
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.isEditMode = true;
      this.loadProductData(slug); // Load product data for editing
    }
  }

  loadProductData(slug: string) {
    this.productService.getProductBySlug(slug).subscribe({
      next: (product) => {
        this.productData = { ...product }; // Pre-fill the form with existing product data
      },
      error: (error) => {
        console.error('Error fetching product data:', error);
      }
    });
  }

  loadCategories() {
    this.categoryService.allCategories().subscribe({
      next: (response) => {
        this.categories = response; // Assuming response is an array of category objects
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onSubmit() {
    console.log('Submitting product:', this.productData);
    this.productService.createProduct(this.productData).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        this.productData = { name: '', categoryId: '', description: '', price: 0, stocks: 0, expiry: '' }; // Reset form
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }
}
