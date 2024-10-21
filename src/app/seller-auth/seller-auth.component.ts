import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin: boolean = false;
  authError: string = '';

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {
    // Abonnez-vous à l'événement isLoginError lors de l'initialisation du composant
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password is not correct";
      } else {
        this.authError = ''; // Assurez-vous que le message d'erreur est vide lorsque l'erreur n'est pas survenue
      }
    });
  }

  signUp(data: SignUp): void {
    console.warn(data);
    this.seller.userLogin(data);
  }



  openLogin(): void {
    this.showLogin = true;
  }

  openSignUp(): void {
    this.showLogin = false;
  }
}
