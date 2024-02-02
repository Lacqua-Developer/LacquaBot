import { ConfigService } from './../../../../service/config.service';
import { Config } from './../../../../models/config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nros-saidas',
  templateUrl: './nros-saidas.component.html',
  styleUrls: ['./nros-saidas.component.scss']
})
export class NrosSaidasComponent implements OnInit {

  constructor(private config: Config,
              private cs: ConfigService) { }

  public conf: Config[]= new Config[0]();

  ngOnInit(): void {

    this.cs.RetConfig.subscribe(c => this.conf = c)
  }

}
