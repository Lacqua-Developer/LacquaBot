import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/chat.service';
import { UtilService } from 'src/app/services/util.service';
import { DialogDataAbre } from '../../models/dialogs.model';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})
export class ClienteDetalheComponent {

  constructor(
    public dialogRef: MatDialogRef<ClienteDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAbre,
    private chat: ChatService,
    private util: UtilService
  ) {
    this.util.debug('Abrindo Sessão!');
    this.DataDiag = data;
  }

  public UsrDest = 0;
  private DataDiag: DialogDataAbre;
}
