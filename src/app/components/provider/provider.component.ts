import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { ProviderService } from './../../services/provider.service';
import { Provider } from './../../models/Provider.class';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { Subscription, forkJoin } from 'rxjs';

@Component({
	selector: 'app-provider',
	templateUrl: './provider.component.html',
	styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, OnDestroy {

	public providers: Provider[] = [];
	public items = [];
	public Subscription: Subscription;
	public page = 1;
	constructor(
		public ProviderService: ProviderService,
		public BookService: BookService
	) { }

	ngOnInit(): void {
		this.loadAllProvider();
		this.saveDataChart();
	}

	handlePageChange(event) {
		this.page = event;
	}

	saveDataChart() {
		this.Subscription = this.ProviderService.getAllProvider().subscribe(data => {
			for (var i = data.length - 1; i >= 0; i--) {
				let nameProvider = data[i]["name"];
				this.Subscription = this.BookService.getBookByProvider(data[i]["id"]).subscribe(dataBook => {
					if (dataBook.length && dataBook != undefined) {
						this.items.push({ y: dataBook.length, name: nameProvider });
					}
				}, error => {
					this.BookService.handleError(error);
				});
			}
		}, error => {
			this.ProviderService.handleError(error);
		});
	}
	showChartCicle(items) {
		let chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Tỉ trọng sách của các nhà cung cấp",
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
	showChartHightPerformance(items) {
		let dataPoints = [];
		for (var i = items.length - 1; i >= 0; i--) {
			dataPoints.push({y:items[i].y, label: items[i].name});
		}
		let chart = new CanvasJS.Chart("chartContainer-2", {
			theme:'light2',
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Số lượng sách của các nhà cung cấp",
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

	loadAllProvider() {
		this.Subscription = this.ProviderService.getAllProvider().subscribe(data => {
			this.providers = data;
		}, error => {
			this.ProviderService.handleError(error);
		});
	}

	removeProvider(id: string) {
		this.Subscription = this.ProviderService.deleteProviderById(id).subscribe(data => {
		}, error => {
			this.ProviderService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
