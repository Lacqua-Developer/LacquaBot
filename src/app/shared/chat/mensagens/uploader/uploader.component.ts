import { Contato } from './../../../../models/contato';
import { UtilService } from '../../../../services/util.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  selectedFile: File;

  @Input() pathUpload: string;

  @Input() LinkUpload: string;

  @Input() contato: Contato;

  @Output() pathevent = new EventEmitter<string>();

  constructor(private http: HttpClient, private util: UtilService) {}

  ngOnInit(): void {}

  onFileSelected(event): void {
    this.util.debug(event);
    this.selectedFile = <File>event.target.files[0];
  }

  importFile(event): void {
    if (event.target.files.length == 0) {
      this.util.debug('No file selected!');

      return;
    }
    this.selectedFile = event.target.files[0];
    this.onUpload();

    // after here 'file' can be accessed and used for further process
  }

  onUpload(): void {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('whatsappId',this.contato.IdWhatsApp)
    this.http.post(environment.servWhats + 'uploadAttach?number=' + this.contato.Telefone, fd).subscribe(
      (res) => {
        this.util.debug(res);
        this.pathUpload = this.selectedFile.name;
        this.LinkUpload =
          environment.servWhats + 'getAttach?number=' + this.contato.Telefone +
          '&file=' + this.selectedFile.name;
        this.pathevent.emit(this.selectedFile.name);
      },
      (error) => this.util.debug('oops', error)
    );
  }
}

