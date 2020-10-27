import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';
import { AdminService } from './../../services/admin.service';
import { Subscription, forkJoin } from 'rxjs';
import { Admin } from './../../models/Admin.class';
import { FormatDecodeBase64Pipe } from './../../pipes/format-decode-base64.pipe';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

	public isIdLogin: string = sessionStorage.getItem('id');
	public accounts: Admin[] = [];
	public passDecode: string = '';
	public Subscription: Subscription;
	public items = [];
	public checkShowChart = false;
	constructor(public AdminService: AdminService) { }

	ngOnInit(): void {
		this.loadAllAccount();
		this.showChart();
	}

	showChart() {
		this.Subscription = this.AdminService.getAllAccount().subscribe(data => {
			for (var i = data.length - 1; i >= 0; i--) {
				this.items.push({ y: data[i]["access"], label: data[i]["name"] });
			}
			let chart = new CanvasJS.Chart("chartContainer", {
				animationEnabled: true,
				exportEnabled: true,
				title: {
					text: "Đồ thị lượt truy cập của các tài khoản",
					fontFamily: 'Candara'
				},
				data: [{
					type: "column",
					dataPoints: this.items
				}]
			});

			chart.render();
		}, error => {
			this.AdminService.handleError(error);
		});

	}

	loadAllAccount() {
		this.Subscription = this.AdminService.getAllAccount().subscribe(data => {
			this.accounts = data;
		}, error => {
			this.AdminService.handleError(error);
		});
	}

	removeAc(id) {
		this.Subscription = this.AdminService.deleteACById(id).subscribe(data => {

		}, error => {
			this.AdminService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}
}
