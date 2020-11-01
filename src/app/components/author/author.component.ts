import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { AuthorService } from './../../services/author.service';
import { Author } from './../../models/Author.class';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { Subscription, forkJoin } from 'rxjs';

@Component({
	selector: 'app-author',
	templateUrl: './author.component.html',
	styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit, OnDestroy {

	public authors: Author[] = [];
	public items = [];
	public Subscription: Subscription;
	public page = 1;
	constructor(
		public AuthorService: AuthorService,
		public BookService: BookService
	) { }

	ngOnInit(): void {
		this.loadAllAuthor();
		this.saveDataChart();
	}

	loadAllAuthor() {
		this.Subscription = this.AuthorService.getAllAuthor().subscribe(data => {
			this.authors = data;
		});
	}

	saveDataChart() {
		this.Subscription = this.AuthorService.getAllAuthor().subscribe(data => {
			for (var i = data.length - 1; i >= 0; i--) {
				let nameAuthor = data[i]["name"];
				this.Subscription = this.BookService.getAllBook().subscribe(dataBook => {
					let countAuthor: string[] = [];
					for (var i = dataBook.length - 1; i >= 0; i--) {
						if (dataBook[i]["author"] == nameAuthor) {
							countAuthor.push(dataBook[i]["id"]);
						}
					}
					if (countAuthor.length && countAuthor != undefined) {
						this.items.push({ y: countAuthor.length, name: nameAuthor });
					}
				}, error => {
					this.BookService.handleError(error);
				});
			}
		}, error => {
			this.AuthorService.handleError(error);
		});
	}

	handlePageChange(event) {
		this.page = event;
	}

	showChartCicle(items) {
		let chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Tỉ trọng sách của các tác giả",
				fontFamily: 'Candara',
				fontSize: 20
			},
			data: [{
				type: "pie",
				showInLegend: true,
				toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
				indexLabel: "{name} - #percent%",
				dataPoints: items
			}]
		});

		chart.render();
	}

	showChartHightPerformance(items) {
		let dataPoints = [];
		for (var i = items.length - 1; i >= 0; i--) {
			dataPoints.push({ y: items[i].y, label: items[i].name });
		}
		let chart = new CanvasJS.Chart("chartContainer-2", {
			theme: 'light2',
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Số lượng sách của các tác giả",
				fontFamily: 'Candara',
				fontSize: 20
			},
			data: [
				{
					type: "column",
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
