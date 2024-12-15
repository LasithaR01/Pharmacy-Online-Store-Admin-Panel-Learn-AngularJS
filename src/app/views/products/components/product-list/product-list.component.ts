import { Component } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  RowComponent,
} from '@coreui/angular';
import { PageHeadingComponent } from '@docs-components/common/page-heading/page-heading.component';

@Component({
  selector: 'app-product-list',
  imports: [
    PageHeadingComponent,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    CardHeaderComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {}
