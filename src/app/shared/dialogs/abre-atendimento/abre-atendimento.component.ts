import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sessao } from 'src/app/models/sessao';
import { Usuario } from 'src/app/models/usuario';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from 'src/app/services/util.service';
import { DialogDataAbre } from '../../models/dialogs.model';

@Component({
  selector: 'app-texto-atendimento',
  templateUrl: './abre-atendimento.component.html',
  styleUrls: ['./abre-atendimento.component.scss']
})
export class AbreAtendimentoComponent  {

  constructor(
    public dialogRef: MatDialogRef<AbreAtendimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAbre,
    private chat: ChatService,
    private util: UtilService,
    private login: LoginService
  ) {
    this.util.debug('Abrindo Sessão!');
    this.DataDiag = data;
  }

  public UsrDest = 0;
  private DataDiag: DialogDataAbre;

  AbreSessaoAt(): void {
    this.util.debug('Solicita abertura de de sessao');
    if (this.data.contato.Sessao.IdSession > 0) {
      this.chat.IniciaSessao(this.DataDiag.contato).subscribe((y) => {
        this.data.result = y;
        this.util.debug('Sessao:', y);
        if (y) {
          alert('Sessão Aberta!');
          this.util.debug(this.DataDiag);
          this.dialogRef.close();
        } else {
          alert('Sessão iniciada por outro operador!');
          this.util.debug(this.DataDiag);
          this.dialogRef.close();
        }
      });
    } else {
      let uu: Usuario;

      this.login.RetornaUsr.subscribe((u) => (uu = u));
      let ss: Sessao = new Sessao();

      ss.Contato_Idcontato = this.data.contato.IdContato;
      ss.Usuario_IdUsuario = uu.IdUsr;

      this.chat.CriaSessao(ss).subscribe((y) => {
        this.data.contato.Sessao = y;
        this.util.debug('Sessao:', y);
        if (y.IdSession > 0) {
          alert('Sessão Aberta!');
          this.util.debug(this.DataDiag);
          this.dialogRef.close();
        } else {
          alert('Sessão não foi aberta!');
          this.util.debug(this.DataDiag);
          this.dialogRef.close();
        }
      });
    }
  }

}
