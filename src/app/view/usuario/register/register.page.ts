import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cadastro!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alert: Alert, private auth: AuthService){
    this.cadastro = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    });
  }

  ngOnInit(){
    this.cadastro = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get errorControl(){
    return this.cadastro.controls;
  }

  submitForm(){
    if(!this.cadastro.valid){
      this.alert.presentAlert("Ok", "Erro ao logar!")
    }else{
      this.register();
    }
  }

  private register(){
    this.auth.register(this.cadastro.value['email'], this.cadastro.value['senha']).then((res) => {
    this.alert.presentAlert("OK", "Seja bem vindo!");this.router.navigate(['/login'])}).catch((error) => {
    this.alert.presentAlert("Erro", "Erro ao cadastrar!"); console.log(error)});
  }
}
