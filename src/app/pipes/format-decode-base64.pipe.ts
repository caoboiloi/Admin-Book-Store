import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDecodeBase64'
})
export class FormatDecodeBase64Pipe implements PipeTransform {

  transform(value: any): any {
  	let decode = atob(value);
    return decode;
  }

}
