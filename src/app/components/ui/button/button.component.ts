import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button'; // Import PrimeNG ButtonModule
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, CommonModule], // Import necessary modules
  template: `
    <p-button
      [label]="label"
      [disabled]="disabled"
      [styleClass]="styleClass"
      (onClick)="onClick.emit($event)"
    ></p-button>
  `,
})
export class ButtonComponent {
  @Input() label: string = 'Click Me'; // Button label
  @Input() icon: string | null = null; // Optional icon
  @Input() disabled: boolean = false; // Disable state
  @Input() styleClass: string = ''; // Custom CSS class for styling

  // Emit click event for parent components
  @Input() onClick: any = () => {};
}
