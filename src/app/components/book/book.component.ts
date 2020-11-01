import { Component, OnInit, OnDestroy, ElementRef, ViewChild  } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { Subscription, forkJoin } from 'rxjs';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { PublisherService } from './../../services/publisher.service';
import { Publisher } from './../../models/Publisher.class';

import { UserService } from './../../services/user.service';
import { User } from './../../models/User.class';

import { ProviderService } from './../../services/provider.service';
import { Provider } from './../../models/Provider.class';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

	faAddressCard = faAddressCard;
	public Subscription: Subscription;
	// public books: Book[] = [];
	public items = [];
	public books = [];
	public page = 1;

	@ViewChild('buttonClick') buttonClick: ElementRef;
	
	constructor(
		public BookService: BookService,
		public PublisherService: PublisherService,
		public ProviderService: ProviderService,
		public UserService: UserService
	) { }

	ngOnInit(): void {
		this.getAllBook();
		// trigger click
		setTimeout(() => {
			this.buttonClick.nativeElement.click();
		}, 200);
	}

	removeBook(id) {
		this.Subscription = this.BookService.deleteBookById(id).subscribe(data => {
		}, error => {
			this.BookService.handleError(error);
		});
	}

	getAllBook() {
		this.Subscription = this.BookService.getAllBook().subscribe(data => {
			// this.books = data;
			for (var i = data.length - 1; i >= 0; i--) {
				this.items.push({ y: data[i]['price'] });
				let book = data[i];
				this.Subscription = forkJoin([
					this.PublisherService.getPublisherById(data[i]["publisher"]),
					this.ProviderService.getProviderById(data[i]["provider"]),
					this.UserService.getUserById(data[i]["provider"])
				]).subscribe(dataB => {
					let provider: string = '';
					if (dataB[2] != null) {
						provider = dataB[2]["name"];
					}
					else if (data[1] != null) {
						provider = dataB[1]["name"];
					}
					this.books.push({
						id: book["id"],
						img: book["img"],
						name: book["name"],
						sku: book["sku"],
						author: book["author"],
						price: book["price"],
						page: book["page"],
						cover: book["cover"],
						width: book["width"],
						height: book["height"],
						provider: provider,
						publisher: dataB[0]["name"]
					});
				}, error => {
					this.BookService.handleError(error);
				});
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
