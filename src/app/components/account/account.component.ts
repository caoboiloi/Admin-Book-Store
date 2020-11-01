import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import * as CanvasJS from './../../../assets/canvasjs/canvasjs.min';

import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { Subscription, forkJoin } from 'rxjs';

import { Admin } from './../../models/Admin.class';
import { AdminService } from './../../services/admin.service';

import { Book } from './../../models/Book.class';
import { BookService } from './../../services/book.service';

import { Publisher } from './../../models/Publisher.class';
import { PublisherService } from './../../services/publisher.service';

import { Author } from './../../models/Author.class';
import { AuthorService } from './../../services/author.service';

import { Provider } from './../../models/Provider.class';
import { ProviderService } from './../../services/provider.service';

import { User } from './../../models/User.class';
import { UserService } from './../../services/user.service';

import { SendDataService } from './../../services/send-data.service';

import { FormatDecodeBase64Pipe } from './../../pipes/format-decode-base64.pipe';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

	faAddressCard = faAddressCard;
	public isIdLogin: string = sessionStorage.getItem('id');
	public status: boolean = false;
	public accounts: Admin[] = [];
	public books: Book[] = [];
	public users: User[] = [];
	public authors: Author[] = [];
	public publishers: Publisher[] = [];
	public providers: Provider[] = [];
	public passDecode: string = '';

	public Subscription: Subscription;

	public items = [];
	public checkShowChart = false;

	constructor(
		public AdminService: AdminService,
		public BookService: BookService,
		public PublisherService: PublisherService,
		public ProviderService: ProviderService,
		public UserService: UserService,
		public AuthorService: AuthorService,
		public SendDataService: SendDataService
	) {
	}

	ngOnInit(): void {
		this.SendDataService.On("account").subscribe(data => {
			this.status = data;
		});
		this.loadAllAccount();
		this.showChart();
		this.loadAllBook();
		this.loadAllPublisher();
		this.loadAllProvider();
		this.loadAllUser();
		this.loadAllAuthor();
	}

	loadAllAuthor() {
		this.Subscription = this.AuthorService.getAllAuthor().subscribe(data => {
			this.authors = data;
		});
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

	loadAllUser() {
		this.Subscription = this.UserService.getAlluser().subscribe(data => {
			this.users = data;
		}, error => {
			this.UserService.handleError(error);
		});
	}

	loadAllProvider() {
		this.Subscription = this.ProviderService.getAllProvider().subscribe(data => {
			this.providers = data;
		}, error => {
			this.ProviderService.handleError(error);
		});
	}

	loadAllPublisher() {
		this.Subscription = this.PublisherService.getAllPublisher().subscribe(data => {
			this.publishers = data;
		}, error => {
			this.PublisherService.handleError(error);
		});
	}

	loadAllBook() {
		this.Subscription = this.BookService.getAllBook().subscribe(data => {
			this.books = data;
		}, error => {
			this.BookService.handleError(error);
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
