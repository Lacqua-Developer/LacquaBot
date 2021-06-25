import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { DialogDataMedia } from '../../models/dialogs.model';

@Component({
  selector: 'app-play-media',
  templateUrl: './play-media.component.html',
  styleUrls: ['./play-media.component.scss']
})
export class PlayMediaComponent  {

  constructor(
    public dialogRef: MatDialogRef<PlayMediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataMedia
  ) {
    this.Data = data;
    console.log('Media:', data);
  }



  @Input() Data: DialogDataMedia;

}
