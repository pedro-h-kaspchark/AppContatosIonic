import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public logar!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alert: Alert, private auth: AuthService){
    this.logar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  ngOnInit(){
    this.logar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.logar.controls;
  }

  submitForm(){
    if(!this.logar.valid){
      this.alert.presentAlert("Erro", "Erro ao logar!")
    }else{
      this.login()
    }
  }
  private login(){
    this.auth.signIn(this.logar.value['email'], this.logar.value['senha']).then((res) => {
    this.alert.presentAlert("Ok", "Bem vindo!"); this.router.navigate(['/home'])}).catch((error) => {
    this.alert.presentAlert("Ok", "Erro ao logar! Tente novamente."); console.log(error)})
  }

  logarComGmail(){}

  irParaRegistrar(){
    this.router.navigate(['/register']);
  }

}
