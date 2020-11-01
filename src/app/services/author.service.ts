import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from './../models/Author.class';

@Injectable({
	providedIn: 'root'
})
export class AuthorService {

	public API : string = 'http://localhost:8080/api/authors';
	public API_id : string = 'http://localhost:8080/api/authors/id/';
	public API_create : string = 'http://localhost:8080/api/authors/create';
	constructor(
		public http:HttpClient
	) { }

	getAllAuthor(): Observable<Author[]> {
		// trong angular 5+
		return this.http.get<Author[]>(this.API);
	}

	getByAuthor(id): Observable<Author[]> {
		// trong angular 5+
		return this.http.get<Author[]>(this.API_id + id);
	}

	addAuthor(author: Author): Observable<Author> {
		return this.http.post<Author>(this.API_create, author);
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
