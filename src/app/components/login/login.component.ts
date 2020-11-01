import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { AdminService } from './../../services/admin.service';
import { Admin } from './../../models/Admin.class';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


	public username: string = '';
	public password: string = '';
	public title: string = 'Admin login';

	public invalidLogin: boolean = false;

	public Subscription: Subscription;


	public isVisible: boolean = false;
	public messageAlert: string = '';
	constructor(
		private router: Router,
		private AdminService: AdminService
	) { }

	ngOnInit(): void {
	}

	checkLogin() {
		if (this.username == '' || this.password == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng nhập thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			this.Subscription = this.AdminService.getByUsername(this.username).subscribe(data => {
				if (btoa(this.password) == data[0]['pass']) {
					sessionStorage.setItem('username', this.username);
					sessionStorage.setItem('id', data[0]["id"]);
					this.invalidLogin = false;
					let access = data[0]['access'] + 1;
					let ac = new Admin(data[0]['name'], data[0]['pass'], data[0]['username'], data[0]['role'], access, data[0]['img']);
					this.Subscription = this.AdminService.updateAccess(ac, data[0]["id"]).subscribe(access => {
						if (data[0]["role"] == 3) {
							this.router.navigate(['admin/staff']);
						}
						else {
							this.router.navigate(['admin/provider']);
						}
					}, error => {
						this.AdminService.handleError(error);
					});
				} else {
					this.invalidLogin = true;
					if (this.isVisible) {
						return;
					}
					this.isVisible = true;
					this.messageAlert = 'Mật khẩu không đúng, vui lòng nhập lại';
					setTimeout(() => this.isVisible = false, 1000);
				}
			}, error => {
				this.AdminService.handleError(error);
				this.invalidLogin = true;
				this.invalidLogin = true;
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Đăng nhập thất bại';
				setTimeout(() => this.isVisible = false, 1000);
			});
		}

	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
