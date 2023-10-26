import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cadastro!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alert: Alert){
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
      this.alert.presentAlert("Ok", "Bem vindo!");
    }
  }
}
