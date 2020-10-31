import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from './../models/Admin.class';

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	public API_user: string = 'http://localhost:8080/api/admins/username/';
	public API_id : string = 'http://localhost:8080/api/admins/id/';
	public API: string = 'http://localhost:8080/api/admins';
	public API_deletebyid: string = 'http://localhost:8080/api/admins/';
	public API_update: string = 'http://localhost:8080/api/admins/';
	constructor(public http: HttpClient) { }

	getByUsername(username): Observable<Admin> {
		// trong angular 5+
		return this.http.get<Admin>(this.API_user + username);
	}

	getById(id: string): Observable<Admin> {
		return this.http.get<Admin>(this.API_id + id);
	}

	getAllAccount(): Observable<Admin[]> {
		return this.http.get<Admin[]>(this.API);
	}

	updateAccess(acccount: Admin, id: string): Observable<Admin> {
		return this.http.put<Admin>(this.API_update + id, acccount);
	}

	deleteACById(id: string): Observable<Admin> {
		return this.http.delete<Admin>(this.API_deletebyid + id);
	}

	handleError(err) {
		if (err.error instanceof Error) {
			console.log(`Client-side error: ${err.error.message}`);
		}
		else {
			console.log(`Server-side error: ${err.status} - ${err.error}`);
		}
	}

	isUserLoggedIn() {
		let user = sessionStorage.getItem('username');
		return !(user === null);
	}

	logout() {
		sessionStorage.removeItem('username');
		sessionStorage.removeItem('id');
	}
}
