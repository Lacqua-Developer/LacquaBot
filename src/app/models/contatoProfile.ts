export class ContatoProfile {
  constructor(nome: string, url: string, id: string) {
    this.Nome = nome;
    this.Url = url;
    this.IdWhats = id;
  }

  Nome: string;
  Url: string;
  IdWhats: string;
}
