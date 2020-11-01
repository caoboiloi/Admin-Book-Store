import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from './../models/Publisher.class';

@Injectable({
	providedIn: 'root'
})
export class PublisherService {

	public API: string = 'http://localhost:8080/api/publishers';
	public API_id : string = 'http://localhost:8080/api/publishers/id/';
	public API_deletebyid:string = 'http://localhost:8080/api/publishers/';
	public API_create:string = 'http://localhost:8080/api/publishers/create';
	constructor(
		public http:HttpClient
	) { }

	getAllPublisher(): Observable<Publisher[]> {
		// trong angular 5+
		return this.http.get<Publisher[]>(this.API);
	}

	getPublisherById(id:string): Observable<Publisher> {
		return this.http.get<Publisher>(this.API_id + id);
	}

	deleteProviderById(id: string): Observable<Publisher> {
		return this.http.delete<Publisher>(this.API_deletebyid + id);
	}

	addPublisher(publisher: Publisher): Observable<Publisher> {
		return this.http.post<Publisher>(this.API_create, publisher);
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
