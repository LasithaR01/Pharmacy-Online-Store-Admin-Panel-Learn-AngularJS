import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryDataService } from 'src/app/core/category.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  constructor(private _categoryDataService: CategoryDataService) {}

  readonly dialogRef = inject(MatDialogRef<ModalComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close(false); // Return false on cancel
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Return true on confirmation
  }
}
