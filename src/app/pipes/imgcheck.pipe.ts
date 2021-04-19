import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgcheck'
})
export class ImgcheckPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
