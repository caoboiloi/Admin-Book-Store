import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { Subscription, forkJoin } from 'rxjs';

import { BuyService } from './../../services/buy.service';
import { Buy } from './../../models/Buy.class';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { UserService } from './../../services/user.service';
import { User } from './../../models/User.class';

import { ShipperService } from './../../services/shipper.service';
import { Shipper } from './../../models/Shipper.class';

@Component({
	selector: 'app-buy',
	templateUrl: './buy.component.html',
	styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit, OnDestroy {


	faAddressCard = faAddressCard;
	public Subscription: Subscription;
	public items = [];
	public buys = [];
	public page = 1;

	@ViewChild('buttonClick') buttonClick: ElementRef;
	constructor(
		public BookService: BookService,
		public BuyService: BuyService,
		public UserService: UserService,
		public ShipperService: ShipperService
	) { }

	ngOnInit(): void {
		this.loadAllBuy();
		setTimeout(() => {
			this.buttonClick.nativeElement.click();
		}, 200);
	}

	loadAllBuy() {
		this.Subscription = this.BuyService.getAllBuy().subscribe(data => {
			if (data.length && data != undefined) {
				for (var i = data.length - 1; i >= 0; i--) {
					this.items.push({ y: data[i]['allprice'] });
					let buy = data[i];
					forkJoin([
						this.UserService.getUserById(data[i]["iduser"]),
						this.BookService.getBookById(data[i]["idbook"]),
						this.ShipperService.getShipperById(data[i]["idshipper"])
					]).subscribe(dataB => {
						// if (dataB[0].length && data[1].length && data[2].length) {
						this.buys.push({
							id: buy["id"],
							amount: buy["amount"],
							book: dataB[1]["name"],
							img: dataB[1]["img"],
							allprice: buy["allprice"],
							price: buy["price"],
							user: dataB[0]["name"],
							shipper: dataB[2]["name"]
						});
						// }
					});
				}
			}
		});
	}

	handlePageChange(event) {
		this.page = event;
	}

	removeBuy(id: string) {
		this.Subscription = this.BuyService.deleteBuyById(id).subscribe(data => { });
	}

	chartHighPerformance(dataPoints) {
		let chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Sự biến động giá các đơn hàng",
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
