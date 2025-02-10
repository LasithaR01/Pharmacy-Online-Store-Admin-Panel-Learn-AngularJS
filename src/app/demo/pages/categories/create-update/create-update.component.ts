import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDataService } from 'src/app/core/category.service';
import { Category } from 'src/app/core/interface/products';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})
export class CreateComponent {
  categoryForm: FormGroup;

  categoryId: string; // Flag for edit mode

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // Initialize form with default values
    this.categoryForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode (by checking the category ID in the route params)
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadCategoryData(slug); // Load product data for editing
    }
  }

  loadCategoryData(slug: string) {
    this.categoryService.getCategoryBySlug(slug).subscribe({
      next: (category: Category) => {  
        // Populate the form with existing category data
        this.categoryForm.patchValue({
          id: category.id,
          name: category.name,
          description: category.description
        });
        this.categoryId = category.id
      },
      error: (error) => {
        console.error('Error fetching category data:', error);
      }
    });
  }

  onSubmit() {
    this.categoryService.saveOrUpdateCategory(this.categoryForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }
  
}
