import { UtilService } from './util.service';
import { Config } from '../models/config';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AsyncSubject, Observable } from 'rxjs';
import sessionwhats from '../models/sessionwhats';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public conf: Config[] = [new Config()];
  public RetConfig = new AsyncSubject<Config[]>();
  constructor(private http: HttpClient, private util: UtilService) {
    this.util.debug(environment.api + 'config/get');
    const ret = this.http
      .get<Config[]>(environment.api + 'config/get')
      .subscribe((c) => {
        this.SessoesWhats().subscribe((x) => {
          c.forEach((k) => {
            x.forEach((y) => {
              k.StatusConeccao = k.Apelido === y.name;
            });
          });
        });
        this.util.debug('Config');
        this.util.debug(c);
        this.RetConfig.next(c);
        this.RetConfig.complete();
      });
  }

  SessoesWhats(): Observable<sessionwhats[]> {
    this.util.debug(environment);
    return this.http.get<sessionwhats[]>(environment.servWhats + 'sessions');
  }

  AtivaChip(sessao: string): Observable<any> {
    this.util.debug(environment.servWhats + 'start?sessionName=' + sessao);
    return this.http.get<any>(
      environment.servWhats + 'start?sessionName=' + sessao
    );
  }
}
