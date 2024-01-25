import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule ,ProductsComponent,HttpClientModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  productDetails: any; // Change the type based on your product data structure

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.getProductDetails();
    });
  }

  getProductDetails() {
    const apiUrl = 'your_backend_api_url';
    const url = `${apiUrl}/products/${this.productId}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        this.productDetails = data; // Assuming your API returns the product details
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
}