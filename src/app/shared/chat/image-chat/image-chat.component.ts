import { UtilService } from './../../../services/util.service';
import { ChatService } from './../../../services/chat.service';
import { UploderService } from './../../../services/uploder.service';
import { GetProfileService } from './../../../services/get-profile.service';
import { environment } from './../../../../environments/environment.prod';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-chat',
  templateUrl: './image-chat.component.html',
  styleUrls: ['./image-chat.component.scss'],
})
export class ImageChatComponent implements OnChanges {
  constructor(private profile: GetProfileService, private up: UploderService,
    private chat: ChatService,private util: UtilService) {}
  @Input() imgP: string;
  @Input() self: string;
  @Input() session: string;

  public imageWhats = environment.app  + 'assets/Images/Ausente.png';
  public imgWhats =  environment.app  + 'assets/Images/Ausente.png';
  public getProf = () => {
    this.profile.getProfile(this.imgP, this.session).subscribe(urlP => {
      this.util.debug('Contato:' + this.imgP);
      this.util.debug('url:' + (urlP ? urlP : this.imgWhats));
      this.self =  urlP  ;

    });
  }

  onImgError(event){
    event.target.src = this.imgWhats;
    //this.getProf();
   //Do other stuff with the event.target
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.util.debug('ID:' + this.imgP);
    this.util.debug('Contato:' + this.self);
   // this.imageWhats = this.self;
  }
}
