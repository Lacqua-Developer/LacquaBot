import { Contato } from './../../../models/contato';
import { Component, Inject , } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { UtilService } from 'src/app/services/util.service';
import { DialogData } from '../../models/dialogs.model';
import { Sessao } from 'src/app/models/sessao';

@Component({
  selector: 'app-transfere-atendimento',
  templateUrl: './transfere-atendimento.component.html',
  styleUrls: ['./transfere-atendimento.component.scss']
})
export class TransfereAtendimentoComponent  {

  constructor(
    public dialogRef: MatDialogRef<TransfereAtendimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private chat: ChatService,
    private util: UtilService
  ) {
    this.util.debug(data);
  }
  public UsrDest = 0;
  selectChangeHandler(event: any): void {
    this.util.debug('Selecionado:', event);
    this.UsrDest = event;
  }

  TransfereAt(): void {
    this.util.debug('Selecionado', this.UsrDest);

    const c: Contato = this.data.contato;
    if (c.Sessao != null) {
      c.Sessao.Usuario_IdUsuario = this.UsrDest;
      this.chat.TransSessao(c).subscribe((y) => {
        this.util.debug('Transferido', y);
        if (y) {
          this.dialogRef.close();
        }
      });
      this.dialogRef.close();
    } else {
      const ss = new Sessao();
      ss.Contato_Idcontato = c.IdContato;
      ss.Usuario_IdUsuario = this.UsrDest;
      this.chat.CriaSessao(ss).subscribe();
      this.dialogRef.close();
    }
  }
}


