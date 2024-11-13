import { Contato } from 'src/app/models/contato';
import { ConfigService } from './config.service';
import { Config } from 'src/app/models/config';
import { Injectable } from '@angular/core';
import { config, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TextoSugestao } from '../models/TextoSugestao';
import { TextoSugestaoFilter } from '../models/texto-sugestao-filter';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class TextoSugestaoService {
  textoSugestaoList: TextoSugestao[] = [];
  api = environment.api + 'TextoSugestao';
  public chip: Config[];

  constructor(private http: HttpClient, private configChip: ConfigService) {
    this.configChip.RetConfig.subscribe((x) => (this.chip = x));
  }

  findById(id: string): Observable<TextoSugestao> {
    const url = `${this.api}/get/${id}`;
    const params = { idSugest: id };
    return this.http.get<TextoSugestao>(url, { params, headers });
  }

  load(filter: TextoSugestaoFilter): void {
    this.find(filter).subscribe(
      (result) => {
        this.textoSugestaoList = result;
      },
      (err) => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: TextoSugestaoFilter): Observable<TextoSugestao[]> {
    const params = {
      id: filter.Nome,
    };

    return this.http.get<TextoSugestao[]>(this.api + '/getChave', {
      params,
      headers,
    });
  }

  TrocaVariaveis(c: Contato): Observable< string> {
    let ret = new Observable< string>();
    if (c.FaceMsgId.length > 0) {
      const url = `${this.api}/TrocaTexto`;

      return this.http.post<string>(url, c);

    }
    return ret;
  }

  save(entity: TextoSugestao): Observable<TextoSugestao> {
    let params = new HttpParams();
    let url = '';
    if (entity.idSugest) {
      url = `${this.api}/post`;
      params = new HttpParams().set('ID', entity.idSugest.toString());
      return this.http.post<TextoSugestao>(url, entity);
    } else {
      url = `${this.api}/post`;
      return this.http.post<TextoSugestao>(url, entity);
    }
  }

  delete(entity: TextoSugestao): Observable<TextoSugestao> {
    let params = new HttpParams();
    let url = '';
    if (entity.idSugest) {
      url = `${this.api}/delete/${entity.idSugest.toString()}`;
      params = new HttpParams().set('ID', entity.idSugest.toString());
      return this.http.delete<TextoSugestao>(url, { headers, params });
    }
    return null;
  }
}
