import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.isUserLoggedIn())
			return true;

		this.router.navigate(['login']);
		return false;
	}

	isUserLoggedIn() {
		let user = sessionStorage.getItem('username');
		return !(user === null);
	}

}