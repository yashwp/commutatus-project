import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value, args, 'Pipes');
    return value.toString().substring(0, value.length - 1);
  }

}
