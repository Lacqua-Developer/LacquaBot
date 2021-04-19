import { CoreService } from '../services/core.service';
import { ChatService } from '../services/chat.service';
import { UtilService } from '../services/util.service';
import { Contato } from './../models/contato';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter',
})
export class MyFilterPipe implements PipeTransform {
  constructor(
    private util: UtilService,
    private chat: ChatService,
    private core: CoreService
  ) {}
  transform(items: Contato[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    this.util.debug(filter, items.length);

    let ret = items.filter(
      (item) =>
        item.NomeRetornado?.toLowerCase().includes(filter.toLowerCase()) ||
        item.NomeInformado?.toLowerCase().includes(filter.toLowerCase()) ||
        item.Telefone?.toLowerCase().includes(filter.toLowerCase()) ||
        item.Documento?.toLowerCase().includes(filter.toLowerCase()) ||
        item.Codigo?.toLowerCase().includes(filter.toLowerCase()) ||
        item.IdWhatsApp?.toLowerCase().includes(filter.toLowerCase())
    );

    this.util.debug(filter, ret);

    if (ret.length == 0) {
      this.core.ContatoFilter(filter);
    }

    return ret;
  }
}
