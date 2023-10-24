import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public logar!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alert: Alert){
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
      this.alert.presentAlert("Ok", "Erro ao logar!")
    }else{
      this.alert.presentAlert("Ok", "Bem vindo!");
    }
  }

  logarComGmail(){}

  irParaRegistrar(){
    this.router.navigate(['/register']);
  }

}
