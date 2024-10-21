import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthComponent } from '../user-auth/user-auth.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cartData = new EventEmitter<UserService[] | []>();
  invalidUserAuth= new EventEmitter<boolean>(false)

  constructor( private http:HttpClient, private router:Router ) { }

    //dashboard
    userList(){
      return this.http.get<UserAuthComponent[]>('http://localhost:3000/users');
    }
  userSignUp(user:SignUp){
    this.http.post('http://localhost:3000/users',user,{observe:'response'})
    .subscribe((result)=>{ console.warn(result);
     if(result){
       localStorage.setItem('user',JSON.stringify(result.body));
       this.router.navigate(['/']);
     }

    })
}

userLogin(data:login){
  this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
  {observe:'response'}
  ).subscribe((result)=>{
    if(result && result.body?.length){
      //contenu retourné par le serveur : il s'agit des données demandées
      localStorage.setItem('user',JSON.stringify(result.body[0]));
      this.router.navigate(['/']);
      this.invalidUserAuth.emit(false)
  }else{
      this.invalidUserAuth.emit(true)
    }
  })
}


}
