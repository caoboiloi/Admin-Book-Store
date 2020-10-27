import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';
import { AdminService } from './../../services/admin.service';
import { Subscription, forkJoin } from 'rxjs';
import { Admin } from './../../models/Admin.class';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

	public isAccountLogin: Admin;
	public Subscription: Subscription;
	public isUserLogin: string = sessionStorage.getItem('username');
	constructor(public AdminService: AdminService) { }

	ngOnInit() {
		this.loadAccountLogin();
	}

	loadAccountLogin() {
		this.Subscription = this.AdminService.getByUsername(this.isUserLogin).subscribe(data => {
			this.isAccountLogin = data;
		}, error => {
			this.AdminService.handleError(error);
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			// code...
			this.Subscription.unsubscribe();
		}
	}
}
