import { UtilService } from './util.service';
import { UserProfile } from '../models/userProfile';
import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { requestap } from 'src/app/models/requestzap';

@Injectable({
  providedIn: 'root',
})
export class GetProfileService {
  constructor(private http: HttpClient, private util: UtilService) {}

  public getTelefoneStatus(tefone: string, session: string): Observable<UserProfile>{
    const ret = this.http.get<UserProfile>(environment.servWhats + 'getProfile?sessionName=' + session + '&chatId=' +  tefone);
    return ret;
  }

  public getProfile(id: string, session: string): Observable<string> {
    const req: requestap = new requestap();
    req.number = id;
    req.sessionName = session;
    req.text = 'Image';
    let retorno = '';
    const ret = this.http.post<string>(environment.servWhats + 'getPic', req);
    ret.subscribe(x => {
      retorno = x;
      const cont = new Contato();
      cont.IdWhatsApp =   id;
      cont.ImageProfile = environment.servWhats + 'download/' + id + '.jpg';
      this.http.post<boolean>( environment.api + 'contatos/setProfileImage', cont)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe( x => {
          if (x) { this.util.debug('Imagem Atualizada'); }
          else { this.util.debug('Imagem não Atualizada'); }
        } );
    });

    return this.http.post<string>(environment.servWhats + 'getPic', req);
  }
}


