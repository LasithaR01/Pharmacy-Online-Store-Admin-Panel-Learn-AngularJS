import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styles: ``,
})
export class TableComponent {
  // Input property to receive table data from parent
  @Input() data: any[] = [];

  // Input property to receive column definitions from parent
  @Input() columns: { field: string; header: string }[] = [];

  constructor() {}
}
