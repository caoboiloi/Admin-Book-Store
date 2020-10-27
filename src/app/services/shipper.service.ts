import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipper } from './../models/Shipper.class';

@Injectable({
	providedIn: 'root'
})
export class ShipperService {

	public API:string = 'http://localhost:8080/api/shippers';
	public API_id:string = 'http://localhost:8080/api/shippers/id/';
	constructor(
		public http:HttpClient
	) { }

	getAllShipper(): Observable<Shipper[]> {
		// trong angular 5+
		return this.http.get<Shipper[]>(this.API);
	}

	getShipperById(id): Observable<Shipper> {
		return this.http.get<Shipper>(this.API_id + id);
	}

	handleError(err){
		if(err.error instanceof Error) {
			console.log(`Client-side error: ${err.error.message}`);
		}
		else {
			console.log(`Server-side error: ${err.status} - ${err.error}`);
		}
	}
}
