import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { Subscription, forkJoin } from 'rxjs';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

	public Subscription: Subscription;
	public books: Book[] = [];
	public items = [];
	public page = 1;
	constructor(
		public BookService: BookService
	) { }

	ngOnInit(): void {
		this.getAllBook();
	}

	removeBook(id) {
		this.Subscription = this.BookService.deleteBookById(id).subscribe(data => {
		},error => {
			this.BookService.handleError(error);
		});
	}

	getAllBook() {
		this.Subscription = this.BookService.getAllBook().subscribe(data => {
			this.books = data;
			for (var i = data.length - 1; i >= 0; i--) {
				this.items.push({ y: data[i]['price']});
			}
		}, error => {
			this.BookService.handleError(error);
		});
	}

	handlePageChange(event) {
		this.page = event;
	}

	chartHighPerformance(dataPoints) {
		let chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Sự biến động giá các loại sách",
				fontFamily: 'Candara'
			},
			data: [
				{
					type: "line",
					dataPoints: dataPoints
				}]
		});

		chart.render();
	}


	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}

}
