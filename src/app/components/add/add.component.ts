import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';

import { Admin } from './../../models/Admin.class';
import { AdminService } from './../../services/admin.service';

import { DomSanitizer } from '@angular/platform-browser';

import { Router, ActivatedRoute } from '@angular/router';

import { SendDataService } from './../../services/send-data.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
	// toggle
	public status: boolean = false;
	// show img
	public imagePath: any = null;
	public admin: Admin = null;

	public idAdmin: string = '';

	// Staff
	public name: string = '';
	public role: number;
	public pass: string = '';
	public confirmPass: string = '';
	public username: string = '';
	public base64textString: string = '';

	public title: string = '';

	public type: string = '';

	public Subscription: Subscription;

	public isVisible: boolean = false;
	public messageAlert: string = '';

	constructor(
		public _sanitizer: DomSanitizer,
		private router: Router,
		public AdminService: AdminService,
		public ActivatedRoute: ActivatedRoute,
		public SendDataService: SendDataService
	) { }

	ngOnInit(): void {
		this.SendDataService.On("account").subscribe(data => {
			this.status = data;
		});
		this.Subscription = this.ActivatedRoute.queryParams.subscribe(data => {
			if (data["type"] == "staff") {
				this.type = data["type"];
				this.title = 'nhân viên';
			}
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}

	addProfileAdmin() {
		if (this.username == '' || this.name == '' || this.pass == '' ||
			this.confirmPass == '' || this.role == undefined || this.base64textString == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else if (this.pass != this.confirmPass) {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Xác thực mật khẩu không đúng, vui lòng nhập lại';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			let admin: Admin = new Admin(this.name, btoa(this.pass), this.username, this.role, 0, this.base64textString);
			this.Subscription = this.AdminService.createAccountAdmin(admin).subscribe(data => {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Thêm nhân viên thành công';
				setTimeout(() => this.isVisible = false, 1000);
			}, error => {
				this.AdminService.handleError(error);
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Thêm nhân viên thất bại';
				setTimeout(() => this.isVisible = false, 1000);
			});
		}

	}

	routerUndo(type: string): void {
		this.router.navigate(['admin/' + type]);
	}

	handleSeleted(evt) {
		var files = evt.target.files;
		var file = files[0];
		if (files && file) {
			var reader = new FileReader();
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
		this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
			'data:image/jpg;base64,' + this.base64textString
		);
	}

	handleShow(event) {
		this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
			'data:image/jpg;base64,' + event
		);
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
	}

}
