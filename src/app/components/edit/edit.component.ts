import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';

import { Admin } from './../../models/Admin.class';
import { AdminService } from './../../services/admin.service';

import { DomSanitizer } from '@angular/platform-browser';

import { Router, ActivatedRoute } from '@angular/router';

import { SendDataService } from './../../services/send-data.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

	public status: boolean = false;

	public base64textString: string = '';
	public imagePath: any = null;

	public admin: Admin = null;

	public idAdmin: string = '';

	public name: string = '';
	public role: number;

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
			if (data["type"] == 'staff') {
				this.type = data["type"];
				this.loadAdminById(data["id"]);
				this.idAdmin = data["id"];
				this.title = "nhân viên";
			}
		});
	}

	ngOnDestroy(): void {

	}

	routerUndo(type : string): void {
		this.router.navigate(['admin/' + type]);
	}

	loadAdminById(id: string) {
		this.Subscription = this.AdminService.getById(id).subscribe(data => {
			this.admin = data;
			this.base64textString = data["img"];
			this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
				'data:image/jpg;base64,' + this.base64textString
			);
		}, error => {
			this.AdminService.handleError(error);
		});
	}
	editProfileAdmin() {
		if (this.name == '' || this.role == undefined || this.base64textString == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			this.Subscription = this.AdminService.getById(this.idAdmin).subscribe(data => {
				let admin: Admin = new Admin(this.name, data["pass"], data["username"], this.role, data["access"], this.base64textString);
				this.Subscription = this.AdminService.updateAccess(admin, data["id"]).subscribe(data => {
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Cập nhật thông tin thành công';
					setTimeout(() => this.isVisible = false, 1000);
				}, error => {
					this.AdminService.handleError(error);
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Cập nhật thông tin thất bại';
					setTimeout(() => this.isVisible = false, 1000);
				});

			}, error => {
				this.AdminService.handleError(error);
			});
		}
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
