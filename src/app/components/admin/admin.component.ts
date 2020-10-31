import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import {ActivatedRoute} from '@angular/router';

import { Subscription, forkJoin } from 'rxjs';

import { Admin } from './../../models/Admin.class';
import { AdminService } from './../../services/admin.service';

import { SendDataService } from './../../services/send-data.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

	public status : boolean = false;
	public isAccountLogin: Admin;
	public Subscription: Subscription;
	public isUserLogin: string = sessionStorage.getItem('username');

	constructor(
		public AdminService: AdminService,
		public SendDataService: SendDataService
		) {
	}

	ngOnInit() {
		this.loadAccountLogin();
	}

	handleStatus() {
		this.status = !this.status;
		this.SendDataService.Broadcast("account",this.status);
	}

	loadAccountLogin() {
		this.Subscription = this.AdminService.getByUsername(this.isUserLogin).subscribe(data => {
			this.isAccountLogin = data[0];
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
