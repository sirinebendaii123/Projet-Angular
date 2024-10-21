import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { product, order } from '../data-type';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: product[] = [];
  membersCount: number = 0;
  ordersCount: number = 0;
  productsCount: number = 0;
  selectedCategory: string = '';
  selectedPriceRange: string = '';
  selectedStock: string = '';
  topOrderedProducts: { [key: string]: number } = {};

  constructor(private productService: ProductService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadProductList();
    this.loadUserCount();
    this.loadOrderCount();
    this.loadTopOrderedProducts();
  }

  loadProductList(): void {
    this.productService.productList().subscribe((data: product[]) => {
      this.products = data;
      this.productsCount = data.length;
      this.renderPieChart();
    });
  }

  loadFilteredProducts(): void {
    const filter = {
      category: this.selectedCategory,
      priceRange: this.selectedPriceRange,
      stock: this.selectedStock
    };
    this.productService.getFilteredProducts(filter).subscribe((data: product[]) => {
      this.products = data;
      this.productsCount = data.length;
      this.renderPieChart();
    });
  }

  loadUserCount(): void {
    this.userService.userList().subscribe((data: any[]) => {
      this.membersCount = data.length;
    });
  }

  loadOrderCount(): void {
    this.productService.Getorder().subscribe((data: any[]) => {
      this.ordersCount = data.length;
    });
  }

  loadTopOrderedProducts(): void {
    this.productService.Getorder().subscribe((orders: order[]) => {
      const productOrderCounts: { [key: string]: number } = {};
      orders.forEach(order => {
        const productName = order.email; // Assuming order contains a product name or id, adjust this as needed
        if (productName) {
          productOrderCounts[productName] = (productOrderCounts[productName] || 0) + 1;
        }
      });
      this.topOrderedProducts = productOrderCounts;
      this.renderBarChart();
    });
  }

  renderPieChart(): void {
    const ctx = document.getElementById('productPieChart') as HTMLCanvasElement;
    const categories = this.products.map(p => p.category);
    const categoryCounts = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(categoryCounts),
        datasets: [{
          data: Object.values(categoryCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });
  }

  renderBarChart(): void {
    const ctx = document.getElementById('productBarChart') as HTMLCanvasElement;
    const labels = Object.keys(this.topOrderedProducts);
    const data = Object.values(this.topOrderedProducts);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Orders',
          data: data,
          backgroundColor: '#36A2EB',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
