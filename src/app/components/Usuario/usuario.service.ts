import { environment } from 'src/environments/environment';
import { Usuario } from './usuario';
import { UsuarioFilter } from './usuario-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class UsuarioService {
  usuarioList: Usuario[] = [];
  api =  environment.api +  'usuario';

  constructor(private http: HttpClient) {}

  findById(id: string): Observable<Usuario> {
    const url = `${this.api}/get/${id}`;
    const params = { IdUsr: id };
    return this.http.get<Usuario>(url);
  }

  load(filter: UsuarioFilter): void {
    this.find(filter).subscribe(
      (result) => {
        this.usuarioList = result;
      },
      (err) => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: UsuarioFilter): Observable<Usuario[]> {
    const params = {
      id: filter.NomeUsuario,
    };

    return this.http.get<Usuario[]>(this.api + '/getChave', {
      params,
      headers,
    });
  }

  save(entity: Usuario): Observable<Usuario> {
    let params = new HttpParams();
    let url = '';
    if (entity.IdUsr) {
      url = `${this.api}/post`;
      params = new HttpParams().set('ID', entity.IdUsr.toString());
      return this.http.post<Usuario>(url, entity);
    } else {
      url = `${this.api}/post`;
      return this.http.post<Usuario>(url, entity);
    }
  }

  delete(entity: Usuario): Observable<Usuario> {
    return null;
  }
}
