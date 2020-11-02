import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { ShipperService } from './../../services/shipper.service';
import { Shipper } from './../../models/Shipper.class';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { BuyService } from './../../services/buy.service';
import { Buy } from './../../models/Buy.class';

import { Subscription, forkJoin } from 'rxjs';

import { SendDataService } from './../../services/send-data.service';

@Component({
	selector: 'app-shipper',
	templateUrl: './shipper.component.html',
	styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

	faAddressCard = faAddressCard;
	public status: boolean = false;

	public shippers: Shipper[] = [];
	public items = [];
	public Subscription: Subscription;
	public page = 1;

	@ViewChild('buttonClick1') buttonClick1: ElementRef;
	@ViewChild('buttonClick2') buttonClick2: ElementRef;
	constructor(
		public ShipperService: ShipperService,
		public BookService: BookService,
		public BuyService: BuyService,
		public SendDataService: SendDataService
	) { }

	ngOnInit(): void {
		this.SendDataService.On("account").subscribe(data => {
			this.status = data;
		});
		this.loadAllShipper();
		this.saveDataChart();
		setTimeout(() => {
			this.buttonClick1.nativeElement.click();
		}, 200);

		setTimeout(() => {
			this.buttonClick2.nativeElement.click();
		}, 200);
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
