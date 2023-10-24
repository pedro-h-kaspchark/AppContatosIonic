import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome! : string;
  public email! : string;
  public telefone! : number;
  public genero! : number;
  public imagem : any;

  constructor(private alertController: AlertController, private router: Router, private firebase: FirebaseService) {
    
   }

  ngOnInit() {
  }
  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

cadastrar(){
  if(this.nome && this.email && this.telefone && this.imagem){
    if(this.nome.length >= 3){
      if(validarEmail(this.email)){
        if(this.telefone.toString().length >= 9){
          let novo : Contato = new Contato(this.nome, this.telefone);
        
          if(this.email){
            novo.email = this.email;
          }
          novo.genero = this.genero;
          if(this.imagem){
            this.firebase.uploadImage(this.imagem, novo)?.then(() =>{this.router.navigate(["/home"])})
          }else{
          this.firebase.cadastrar(novo).then(() => this.router.navigate(["/home"])).catch((error) => {console.log(error); this.presentAlert("Erro", "Erro ao salvar o contato!")});
          }
        }
        else{
          this.presentAlert("Erro ao cadastrar!", "N° de telefone incorreto");
        }
      }
      else{
        this.presentAlert("Erro ao cadastrar!", "Email incorreto");
      }
    }
    else{
      this.presentAlert("Erro ao cadastrar!", "Nome muito curto");
    }
  }else{
      this.presentAlert("Erro ao cadastrar!", "Todos os campos são obrigatórios");
    }

function validarEmail(email: string): boolean{
  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padrao.test(email);
  }

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