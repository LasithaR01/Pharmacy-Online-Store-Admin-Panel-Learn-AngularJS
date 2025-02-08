import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryDataService } from 'src/app/core/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryDataService,
    private router: Router,
  ) {
    // Initialize form with default values
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log('Category created successfully:', response);
          this.categoryForm.reset(); // Reset form after success
          this.router.navigate(['/categories'])
        },
        error: (error) => {
          console.error('Error creating category:', error);
        }
      });
    }
  }
}
