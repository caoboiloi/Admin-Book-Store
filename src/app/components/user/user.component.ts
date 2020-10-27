import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { UserService } from './../../services/user.service';
import { User } from './../../models/User.class';

import { BookService } from './../../services/book.service';
import { Book } from './../../models/Book.class';

import { BuyService } from './../../services/buy.service';
import { Buy } from './../../models/Buy.class';

import { Subscription, forkJoin } from 'rxjs';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

	public users: User[] = [];
	public buys: Buy[] = [];
	public Subscription: Subscription;
	public items = [];
	public page = 1;
	public pageBuy = 1;
	constructor(
		public UserService: UserService,
		public BookService: BookService,
		public BuyService: BuyService
	) { }

	ngOnInit(): void {
		this.getAllUser();
		this.getAllBuy();
	}

	getAllUser() {
		this.Subscription = this.UserService.getAlluser().subscribe(data => {
			this.users = data;
		}, error => {
			this.UserService.handleError(error);
		});
	}

	getAllBuy() {
		this.Subscription = this.BuyService.getAllBuy().subscribe(data => {
			this.buys = data;
			for (var i = data.length - 1; i >= 0; i--) {
				this.items.push({y : data[i]["allprice"]});
			}
		}, error => {
			this.BuyService.handleError(error);
		});
	}

	chartHighPerformance(dataPoints) {
		let chart = new CanvasJS.Chart("chartContainer", {
			zoomEnabled: true,
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Sự biến động giá bán đầu ra",
				fontFamily: 'Candara'
			},
			subtitles: [{
				text: "100 đơn hàng gần nhất",
				fontFamily: 'Candara',
				fontSize:15
			}],
			data: [
				{
					type: "line",
					dataPoints: dataPoints
				}]
		});

		chart.render();
	}

	handlePageChange(event) {
		this.page = event;
	}

	handlePageChangeBuy(event) {
		this.pageBuy = event
	}

	removeUser(id:string) {
		this.Subscription = this.UserService.deleteUserById(id).subscribe(data=>{
			console.log('success');
		},error => {
			this.UserService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
