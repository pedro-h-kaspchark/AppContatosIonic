export class Contato{
    private _nome: string;
    private _telefone: number;
    private _email!: string;
    private _genero!: number;    

    constructor(nome: string, telefone: number){
        this._nome = nome;
        this._telefone = telefone;
    }
    //---------------------------------------//
    public get nome() : string{
        return this._nome;
    }
    public set nome(nome : string){
        this._nome;
    }
    //---------------------------------------//
    public get email() : string{
        return this._email;
    }
    public set email(email : string){
        this._email;
    }
    //---------------------------------------//
    public get telefone() : number{
        return this._telefone;
    }
    public set telefone(telefone : number){
        this._telefone;
    }
    //---------------------------------------//
    public get genero(): number {
        return this._genero;
    }
    public set genero(value: number) {
        this._genero = value;
    }
}