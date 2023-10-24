import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { confirmAlert } from 'src/app/common/confirmAlert';
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
  imagem!: any;

  constructor(private firebase: FirebaseService, private router: Router, private alert: Alert, private confirmAlert: confirmAlert) {
  
   }

  ngOnInit() {
    this.contato = history.state.contato;
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
  uploadFile(imagem: any){
    this.imagem = imagem.files;
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
            novo.id = this.contato.id;
            if(this.imagem){
              this.firebase.uploadImage(this.imagem, novo)?.then(() => {this.router.navigate(["/home"]);})
            }else{novo.downloadURL = this.contato.downloadURL;
              this.firebase.editar(novo, this.contato.id).then(() => this.router.navigate(["/home"]))
              .catch((error) => {console.log(error); this.alert.presentAlert("Erro", "Erro ao atualizar o contato!")});}
          }
          else{
            this.alert.presentAlert("Erro ao cadastrar!", "N° de telefone incorreto");
          }
        }
        else{
          this.alert.presentAlert("Erro ao cadastrar!", "Email incorreto");
        }
      }
      else{
        this.alert.presentAlert("Erro ao cadastrar!", "Nome muito curto");
      }
    }else{
        this.alert.presentAlert("Erro ao cadastrar!", "Todos os campos são obrigatórios");
      }
  
  function validarEmail(email: string): boolean{
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
    }
  
  }
  excluir(){
    this.confirmAlert.presentConfirmAlert("ATENÇÃO", "Deseja realmente excluir o contato?", (confirmed) => {if(confirmed){this.excluirContato()}})
  }
    
  excluirContato(){
    this.firebase.excluir(this.contato.id).then(() => {this.router.navigate(["/home"]);})
    .catch((error) => {console.log(error); this.alert.presentAlert("Erro", "Erro ao excluir o contato!")});
  }
}
