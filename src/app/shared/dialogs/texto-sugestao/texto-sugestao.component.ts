import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Config } from 'src/app/models/config';
import { TextoSugestaoService } from 'src/app/services/texto-sugestao.service';
import { DialogDataSug } from '../../models/dialogs.model';


@Component({
  selector: 'app-dialog-sugestao',
  templateUrl: './dialog-sugestao.html',
  styleUrls: ['./dialog-sugestao.scss'],
})
export class SugestaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SugestaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSug,
    private tt: TextoSugestaoService
  ) {
    //  this.util.debug('Sugestao:', data);
    if (data.chip.length > 0) {
      this.chip = data.chip[0];
    }
  }
  public chip: Config;

  SelecionaTexto(texto): void {
    this.data.contato.FaceMsgId = texto;
    const t = '';
    this.tt.TrocaVariaveis(this.data.contato).subscribe((ttt) => {
      this.dialogRef.close(ttt);
    });
  }
}
