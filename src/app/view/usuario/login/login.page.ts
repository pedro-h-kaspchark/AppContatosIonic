import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/common/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public logar!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alertController: AlertController){
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
      this.presentAlert("Ok", "Erro ao logar!")
    }else{
      this.presentAlert("Ok", "Bem vindo!");
    }
  }

  logarComGmail(){}

  irParaRegistrar(){
    this.router.navigate(['/register']);
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
  
    await alert.present();
    }

}
