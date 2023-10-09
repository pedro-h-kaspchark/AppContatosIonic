import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  indice!: number;
  nome!: string;
  telefone!: number;
  email!: string;
  genero!: number;
  contato!: Contato;
  edicao: boolean = true;

  constructor(private alertController: AlertController, private actRoute : ActivatedRoute, private firebase: FirebaseService, private router: Router) {
  
   }

  ngOnInit() {
    this.actRoute.params.subscribe((parametros) => {
      if(parametros["indice"]){
        this.indice = parametros["indice"];
      }
    })
    this.nome = this.contato.nome;
    this.telefone = this.contato.telefone;
    this.email = this.contato.email;
    this.genero = this.contato.genero;
  }
  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }
  editar(){
    if(this.nome && this.email && this.telefone){
      if(this.nome.length >= 3){
        if(validarEmail(this.email)){
          if(this.telefone.toString().length >= 9){
            let novo : Contato = new Contato(this.nome, this.telefone);
          
            if(this.email){
              novo.email = this.email;
            }
            novo.genero = this.genero;
            this.firebase.cadastrar(novo).then(() => this.router.navigate(["/home"])).catch((error) => {console.log(error); this.presentAlert("Erro", "Erro ao salvar o contato!")});
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
  
    this.nome = "";
    this.email = "";
    this.telefone = NaN;
  
  function validarEmail(email: string): boolean{
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
    }
  
  }
  excluir(){
    this.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir o contato?");
  }
    
  excluirContato(){  
    if (this.contato && this.contato.id){
      this.firebase.excluir('/contatos/${this.contato.id}').then(() => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.log(error);
      this.presentAlert('Erro', 'Erro ao excluir o contato!');
    });
  }else {
    this.presentAlert('Erro', 'O ID do contato não está definido.');
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

    async presentConfirmAlert(subHeader: string, message: string) {
      const alert = await this.alertController.create({
        header: 'Agenda de Contatos',
        subHeader: subHeader,
        message: message,
        buttons: [
          {text: "Cancelar", role: 'cancelar', handler: ()=>{console.log("cancelou")}},
          {text: "Confirmar", role: 'confirmar', handler: (acao)=>{this.excluirContato()}}
        ],
      });
    
      await alert.present();
      }

}
