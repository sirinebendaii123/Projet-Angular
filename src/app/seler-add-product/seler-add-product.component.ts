import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seler-add-product',
  templateUrl: './seler-add-product.component.html',
  styleUrls: ['./seler-add-product.component.css']
})
export class SelerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private productService: ProductService, private router: Router) {}

  submit(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      console.warn(data);
      if (result) {
        this.addProductMessage = 'Product is successfully added';
        // Redirection vers la route seller-home après l'ajout du produit
        this.router.navigate(['/seller-home']);
      }

      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 3000);
    });
  }
}
