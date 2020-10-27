import { Component, OnInit, ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	constructor(
		private router: Router,
		private AdminService : AdminService) {

	}
	ngOnInit() {
		this.AdminService.logout();
		this.router.navigate(['login']);
	}
}