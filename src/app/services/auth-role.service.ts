import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AdminService } from './admin.service';
import { Book } from './../models/Book.class';

@Injectable({
	providedIn: 'root'
})
export class AuthRoleService implements CanActivate {

	public checked : boolean = false;
	constructor(
		private router: Router,
		private AdminService: AdminService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let user = sessionStorage.getItem('username');
		this.AdminService.getByUsername(user).subscribe(data => {
			if (data[0]["role"] == 3) {
				this.checked = true;
			}
			else {
				this.checked = false;
			}
		});
		this.router.navigate(['admin/staff']);
		return this.checked;
	}

	isUserLoggedIn() {
		let user = sessionStorage.getItem('username');
		return !(user === null);
	}

}