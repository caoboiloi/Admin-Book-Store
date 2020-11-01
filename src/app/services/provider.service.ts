import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from './../models/Provider.class';

@Injectable({
	providedIn: 'root'
})
export class ProviderService {

	public API: string = 'http://localhost:8080/api/providers';
	public API_id: string = 'http://localhost:8080/api/providers/id/';
	public API_deletebyid: string = 'http://localhost:8080/api/providers/';
	public API_create : string = 'http://localhost:8080/api/providers/create';
	constructor(
		public http: HttpClient
	) { }

	getAllProvider(): Observable<Provider[]> {
		// trong angular 5+
		return this.http.get<Provider[]>(this.API);
	}

	getProviderById(id: string): Observable<Provider> {
		// trong angular 5+
		return this.http.get<Provider>(this.API_id + id);
	}

	addProvider(provider: Provider): Observable<Provider> {
		return this.http.post<Provider>(this.API_create, provider);
	}

	deleteProviderById(id: string): Observable<Provider> {
		return this.http.delete<Provider>(this.API_deletebyid + id);
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
