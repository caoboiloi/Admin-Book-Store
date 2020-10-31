import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { ShipperService } from './../../services/shipper.service';
import { Shipper } from './../../models/Shipper.class';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { BuyService } from './../../services/buy.service';
import { Buy } from './../../models/Buy.class';

import { Subscription, forkJoin } from 'rxjs';

@Component({
	selector: 'app-shipper',
	templateUrl: './shipper.component.html',
	styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

	public shippers: Shipper[] = [];
	public items = [];
	public Subscription: Subscription;
	public page = 1;
	constructor(
		public ShipperService: ShipperService,
		public BookService: BookService,
		public BuyService: BuyService
	) { }

	ngOnInit(): void {
		this.loadAllShipper();
		this.saveDataChart();
	}

	loadAllShipper() {
		this.Subscription = this.ShipperService.getAllShipper().subscribe(data => {
			this.shippers = data;
		}, error => {
			this.ShipperService.handleError(error);
		});
	}

	saveDataChart() {
		this.Subscription = this.ShipperService.getAllShipper().subscribe(data => {
			for (var i = data.length - 1; i >= 0; i--) {
				let nameShipper = data[i]["name"];
				this.Subscription = this.BuyService.getBuyByIdshipper(data[i]["id"]).subscribe(dataBook => {
					if (dataBook.length && dataBook != undefined) {
						this.items.push({ y: dataBook.length, name: nameShipper });
					}
				}, error => {
					this.BookService.handleError(error);
				});
			}
		}, error => {
			this.ShipperService.handleError(error);
		});
	}

	showChartCicle(items) {
		let chart = new CanvasJS.Chart("chartContainer", {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Tỉ trọng sách của các nhà vận chuyển",
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

	handlePageChange(event) {
		this.page = event;
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
				text: "Số lượng sách của các nhà vận chuyển",
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
