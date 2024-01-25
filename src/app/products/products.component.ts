// products.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  mydata: any;
  buttonClicked = false;
  selectedProduct: any;
  url = "http://localhost:8000/";

  constructor(private httpclient: HttpClient, private router: Router) {}

  onClick() {
    this.httpclient.get(this.url + 'getData').subscribe({
      next: (data) => {
        console.log(data);
        this.mydata = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.buttonClicked = true;
    this.selectedProduct = null; // Reset selected product when all products are shown
  }

  showDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }

  // Function to track items in the ngFor loop
  trackByFn(index: number, item: any): any {
    return item.productId; // Change this to a unique identifier in your data
  }
}
