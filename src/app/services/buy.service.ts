import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Buy } from './../models/Buy.class';

@Injectable({
	providedIn: 'root'
})
export class BuyService {

	public API: string = 'http://localhost:8080/api/buys';
	public API_create: string = 'http://localhost:8080/api/buys/create';
	public API_update: string = 'http://localhost:8080/api/buys/id/';
	public API_idshipper:string = 'http://localhost:8080/api/buys/idshipper/';

	constructor(
		public http: HttpClient
	) { }

	getAllBuy(): Observable<Buy[]> {
		return this.http.get<Buy[]>(this.API);
	}

	addBuy(buy: Buy): Observable<Buy> {
		return this.http.post<Buy>(this.API_create, buy);
	}

	updateBuy(buy: Buy, id: string): Observable<Buy> {
		return this.http.put<Buy>(this.API_update + id, buy);
	}

	getBuyByIdshipper(id:string):Observable<Buy[]> {
		return this.http.get<Buy[]>(this.API_idshipper + id);
	}

	handleError(err) {
		if (err.error instanceof Error) {
			console.log(`Client-side error: ${err.error.message}`);
		}
		else {
			console.log(`Server-side error: ${err.status} - ${err.error}`);
		}

	}
}
