import { DialogDataMedia } from './../../../models/dialogs.model';
import { HttpEvent } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PlayMediaComponent } from 'src/app/shared/dialogs/play-media/play-media.component';

@Component({
  selector: 'app-message-ajust',
  templateUrl: './message-ajust.component.html',
  styleUrls: ['./message-ajust.component.scss'],
})
export class MessageAjustComponent implements OnInit, OnChanges {
  constructor(private dialog: MatDialog) {}

  @Input() telefone: string;
  @Input() msgChat: string;
  @Input() sentido: string;
  @Input() ImagemChat: string;
  @Input() enviada: string;
  @Input() erro: string;
  @Input() menssagemerro: string;
  @Input() tentativas: string;
  @Input() dataMsg: string;
  @Input() EnvPor: string;
  @Input() TipoAnexo: string;
  @Input() ChipContato: string;

  public MediaImg = environment.app + 'assets/Images/ImageVideo.png';
  public imageDoc = environment.app + 'assets/Images/Docs.png';
  public DataMedia: DialogDataMedia;
  public Mensagem: string;
  public AppOk = '';
  public imageOk = '';
  public audioOk = '';
  public videoOk = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  onImgError(event): void {
    event.target.src = this.imageDoc;
    event.target.style.width = '60px';
  }

  ngOnInit(): void {
   // console.log('Entrou na Msg:',this.msgChat )
    this.Mensagem =
      this.msgChat?.length > 0 ? this.msgChat.replace(/\\n/g, '<br/>') : '';
  this.DataMedia
    if (this.ImagemChat?.length > 0) {
      if (this.ImagemChat != null) {
        if (this.sentido == 'Saida') {
          switch (this.TipoAnexo) {
            case 'image':
              this.imageOk =
              environment.servWhats + 'getAttach?number=' + this.telefone + '&file=' + this.ImagemChat;
              break;
            case 'audio':
              this.audioOk =
              environment.servWhats + 'getAttach?number=' + this.telefone + '&file=' +  this.ImagemChat;

              break;
            case 'video':
              this.videoOk =
              environment.servWhats + 'getAttach?number=' + this.telefone + '&file=' +  this.ImagemChat;

              break;
            case 'application':
              this.AppOk =
              environment.servWhats + 'getAttach?number=' + this.telefone + '&file=' +  this.ImagemChat;
              break;
          }
        } else {
          switch (this.TipoAnexo) {
            case 'image':
              this.imageOk =
              environment.servWhats + 'getMedia?number=' + this.telefone + '&file=' + this.ImagemChat;
              break;
            case 'audio':
              this.audioOk =
              environment.servWhats + 'getMedia?number=' + this.telefone + '&file=' + this.ImagemChat;

              console.log('DadosMedia',this.DataMedia);
              break;
            case 'video':
              this.videoOk =
              environment.servWhats + 'getMedia?number=' + this.telefone + '&file=' + this.ImagemChat;

              console.log('DadosMedia',this.DataMedia);
              break;
            case 'application':

              this.AppOk =
              environment.servWhats + 'getMedia?number=' + this.telefone + '&file=' +  this.ImagemChat;

             break;
          }
        }
      }

    }
  }

  AbreMedia(): void {
    const dialogRef = this.dialog.open(PlayMediaComponent, {
      width: '350px',
      height: '250px',
      data: {
        TipoMedia: this.TipoAnexo,
        url: environment.servWhats + 'download/' + this.ImagemChat,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  validURL(str: string): boolean {
    const pattern: RegExp = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );

    const patternhttp: RegExp = new RegExp(
      '^(http?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );

    // fragment locator
    return !!pattern.test(str) || !!patternhttp.test(str);
  }

  validImage(str: string): boolean {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(str);
  }
}

