import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;

  constructor(private firebase: FirebaseService, private auth: AngularFireAuth, private router: Router, private ngZone: NgZone){
    this.auth.authState.subscribe(user =>{
      if(user){
        this.usuarioDados = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDados))
      }else{
        localStorage.setItem('user', 'null');
      }
    });
  }

  public signIn(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  
  public recuperarSenha(email: string){
    return this.auth.sendPasswordResetEmail(email);
  }

  public signOut(){
    return this.auth.signOut().then(() =>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  public estaLogado(): boolean{
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    return(user !== null)? true: false;
  }

  public geteUsuarioLogado(): boolean{
    const user: any = JSON.parse(localStorage.getItem('user') || 'null');
    return(user !== null)? user: false;
  }
}
