import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
  
     this.productService.productList().subscribe((data) => {
       this.trendyProducts = data;
     });
  }
}
