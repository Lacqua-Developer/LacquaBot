import { environment } from './../../../environments/environment';
import { Contato } from './contato';
import { ContatoFilter } from './contato-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class ContatoService {
  contatoList: Contato[] = [];
  api =  environment.api + 'contato';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Contato> {
    const url = `${this.api}/get/${id}`;
    const params = { IdContato: id };
    return this.http.get<Contato>(url, {params, headers});
  }

  load(filter: ContatoFilter): void {
    this.find(filter).subscribe(result => {
        this.contatoList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: ContatoFilter): Observable<Contato[]> {
    const params = {
      'id': filter.NomeInformado,
    };

    return this.http.get<Contato[]>(this.api + '/GetChave' , {params, headers});
  }

  save(entity: Contato): Observable<Contato> {
    let params = new HttpParams();
    let url = '';
    if (entity.IdContato) {
      url = `${this.api}/post`;
      params = new HttpParams().set('ID', entity.IdContato.toString());
      return this.http.post<Contato>(url, entity);
    } else {
      url = `${this.api}/post`;
      return this.http.post<Contato>(url, entity);
    }
  }

  delete(entity: Contato): Observable<Contato> {

    return null;
  }
}

