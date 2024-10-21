import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'; // Importez Router
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private sellerService: SellerService, private router: Router) {} // Injectez Router ici

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.sellerService.isSellerLoggedIn.getValue()) {
      return true; // Autoriser l'accès à la route si le vendeur est connecté
    } else {
      // Rediriger vers une autre route si le vendeur n'est pas connecté
      // Dans cet exemple, redirigez vers la page de connexion du vendeur
      this.router.navigate(['/seller-auth']);
      return false;
    }
  }
}
