import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName:string="";
  cartItems=0;
  searchResult: undefined | product[];

  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {
        if (localStorage.getItem('seller')) {
          let sellerStore = localStorage.getItem('seller');
          if (sellerStore) {
            let sellerData = JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }

        } else if (localStorage.getItem('user')) {

          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id);
         
        }
        else {
          this.menuType = 'default';
        }
      });
      let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    } 
    this.product.cartData.subscribe((items)=>{
      this.cartItems= items.length
    })
  }

  

  logout(): void {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent): void {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        console.warn(element.value);
        this.searchResult = result;
      });
    }
  }

  hideSearch(): void {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number): void {
    this.route.navigate(['/details/' + id]);
  }

  submitSearch(val: string): void {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
