import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'formatImg'
})
export class FormatImgPipe implements PipeTransform {

	constructor(private _sanitizer: DomSanitizer) { }

	transform(value: any): any {
		let imagePath: any = null;
		imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + value);
		return imagePath;
	}

}
