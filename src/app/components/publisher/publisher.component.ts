import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { PublisherService } from './../../services/publisher.service';
import { Publisher } from './../../models/Publisher.class';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { Subscription, forkJoin } from 'rxjs';

@Component({
	selector: 'app-publisher',
	templateUrl: './publisher.component.html',
	styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

	public publishers: Publisher[] = [];
	public items = [];
	public Subscription: Subscription;
	public page = 1;
	constructor(
		public PublisherService: PublisherService,
		public BookService: BookService
	) { }

	ngOnInit(): void {
		this.saveDataChart();
		this.loadAllPublisher();
	}

	handlePageChange(event) {
		this.page = event;
	}

	saveDataChart() {
		this.Subscription = this.PublisherService.getAllPublisher().subscribe(data => {
			for (var i = data.length - 1; i >= 0; i--) {
				let nameProvider = data[i]["name"];
				this.Subscription = this.BookService.getBookByPublisher(data[i]["id"]).subscribe(dataBook => {
					if (dataBook.length && dataBook != undefined) {
						this.items.push({ y: dataBook.length, name: nameProvider });
					}
				}, error => {
					this.BookService.handleError(error);
				});
			}
		}, error => {
			this.PublisherService.handleError(error);
		});
	}

	showChartCicle(items) {
		let chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Tỉ trọng sách của các nhà xuất bản",
				fontFamily: 'Candara',
				fontSize : 20
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

	removePublisher(id: string) {
		this.Subscription = this.PublisherService.deleteProviderById(id).subscribe(data => {
		}, error => {
			this.PublisherService.handleError(error);
		});
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
				text: "Số lượng sách của các nhà xuất bản",
				fontFamily: 'Candara',
				fontSize : 20
			},
			data: [
				{
					type: "column",
					dataPoints: dataPoints
				}]
		});

		chart.render();
	}

	loadAllPublisher() {
		this.Subscription = this.PublisherService.getAllPublisher().subscribe(data => {
			this.publishers = data;
		}, error => {
			this.PublisherService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
