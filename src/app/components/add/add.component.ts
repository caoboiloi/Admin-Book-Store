import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';

import { Admin } from './../../models/Admin.class';
import { AdminService } from './../../services/admin.service';

import { Book } from './../../models/Book.class';
import { BookService } from './../../services/book.service';

import { ProviderService } from './../../services/provider.service';
import { Provider } from './../../models/Provider.class';

import { PublisherService } from './../../services/publisher.service';
import { Publisher } from './../../models/Publisher.class';

import { AuthorService } from './../../services/author.service';
import { Author } from './../../models/Author.class';

import { DomSanitizer } from '@angular/platform-browser';

import { Router, ActivatedRoute } from '@angular/router';

import { SendDataService } from './../../services/send-data.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
	// toggle
	public status: boolean = false;
	// show img
	public imagePath: any = null;
	public admin: Admin = null;

	public book: Book = null;

	// Staff
	public name: string = '';
	public role: number;
	public pass: string = '';
	public confirmPass: string = '';
	public username: string = '';
	public base64textString: string = '';

	// book
	public bookName: string = '';
	public bookPublisher: string = '';
	public bookPrice: number;
	public bookProvider: string = '';
	public bookAuthor: string = '';
	public bookHeight: number;
	public bookWidth: number;
	public bookCover: string = '';
	public bookSku: number;
	public bookPage: number;
	public bookDes: string = '';

	// title
	public title: string = '';
	public type: string = '';

	// checksum
	public Subscription: Subscription;

	// alert
	public isVisible: boolean = false;
	public messageAlert: string = '';

	constructor(
		public _sanitizer: DomSanitizer,
		private router: Router,
		public AdminService: AdminService,
		public BookService: BookService,
		public PublisherService: PublisherService,
		public ProviderService: ProviderService,
		public AuthorService: AuthorService,
		public ActivatedRoute: ActivatedRoute,
		public SendDataService: SendDataService
	) { }

	ngOnInit(): void {
		this.SendDataService.On("account").subscribe(data => {
			this.status = data;
		});
		this.Subscription = this.ActivatedRoute.queryParams.subscribe(data => {
			if (data["type"] == "staff") {
				this.type = data["type"];
				this.title = 'nhân viên';
			}
			if (data["type"] == "book") {
				this.type = data["type"];
				this.title = 'sách';
			}
		});
	}

	ngOnDestroy(): void {
		if (this.Subscription) {
			this.Subscription.unsubscribe();
		}
	}

	addProfileBook() {
		if (this.bookName == '' || this.bookPublisher == '' || this.bookPrice == undefined || this.bookProvider == '' ||
			this.bookAuthor == '' || this.bookHeight == undefined || this.bookWidth == undefined || this.bookCover == '' ||
			this.bookSku == undefined || this.bookPage == undefined || this.bookDes == '' || this.base64textString == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			forkJoin([
				this.PublisherService.getAllPublisher(),
				this.ProviderService.getAllProvider(),
				this.AuthorService.getAllAuthor()
			]).subscribe(data => {

				let checkPublisher = false;

				let checkAuthor = false;

				let checkProvider = false;
				// check
				for (var i = data[0].length - 1; i >= 0; i--) {
					if (this.bookPublisher == data[0][i]["name"]) {
						checkPublisher = true;
					}
				}
				for (var i = data[1].length - 1; i >= 0; i--) {
					if (this.bookProvider == data[1][i]["name"]) {
						checkProvider = true;
					}
				}
				for (var i = data[2].length - 1; i >= 0; i--) {
					if (this.bookAuthor == data[2][i]["name"]) {
						checkAuthor = true;
					}
				}

				// add new publisher
				if (!checkPublisher) {
					let publisher = new Publisher(this.bookPublisher);
					this.Subscription = this.PublisherService.addPublisher(publisher).subscribe(data => {

					}, error => {
						this.PublisherService.handleError(error);
					});
				}

				// add new provider
				if (!checkProvider) {
					let provider = new Provider(this.bookProvider);
					this.Subscription = this.ProviderService.addProvider(provider).subscribe(data => {

					}, error => {
						this.PublisherService.handleError(error);
					});
				}

				// add new author
				if (!checkAuthor) {
					let author = new Author(this.bookAuthor);
					this.Subscription = this.AuthorService.addAuthor(author).subscribe(data => {

					}, error => {
						this.PublisherService.handleError(error);
					});
				}

				forkJoin([
					this.PublisherService.getAllPublisher(),
					this.ProviderService.getAllProvider()
				]).subscribe(data => {
					let book: Book = null;
					let publisherID = '';
					let providerID = '';
					for (var i = data[0].length - 1; i >= 0; i--) {
						if (this.bookPublisher == data[0][i]["name"]) {
							publisherID = data[0][i]["id"];
						}
					}
					for (var i = data[1].length - 1; i >= 0; i--) {
						if (this.bookProvider == data[1][i]["name"]) {
							providerID = data[1][i]["id"];
						}
					}
					book = new Book(
						this.bookName, this.bookPage, this.bookPrice, this.bookSku, publisherID, providerID, this.bookHeight,
						this.bookWidth, this.bookCover, this.base64textString, this.bookDes, 0, this.bookAuthor, 0, 0, 1
					);
					this.Subscription = this.BookService.addBook(book).subscribe(data => {
						if (this.isVisible) {
							return;
						}
						this.isVisible = true;
						this.messageAlert = 'Thêm sách mới thành công';
						setTimeout(() => this.isVisible = false, 1000);
					}, error => {
						this.BookService.handleError(error);
						if (this.isVisible) {
							return;
						}
						this.isVisible = true;
						this.messageAlert = 'Thêm sách mới thất bại';
						setTimeout(() => this.isVisible = false, 1000);
					});
				});
			});
		}

	}

	addProfileAdmin() {
		if (this.username == '' || this.name == '' || this.pass == '' ||
			this.confirmPass == '' || this.role == undefined || this.base64textString == '') {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Vui lòng điền đầy đủ thông tin';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else if (this.pass != this.confirmPass) {
			if (this.isVisible) {
				return;
			}
			this.isVisible = true;
			this.messageAlert = 'Xác thực mật khẩu không đúng, vui lòng nhập lại';
			setTimeout(() => this.isVisible = false, 1000);
		}
		else {
			let admin: Admin = new Admin(this.name, btoa(this.pass), this.username, this.role, 0, this.base64textString);
			this.Subscription = this.AdminService.createAccountAdmin(admin).subscribe(data => {
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Thêm nhân viên thành công';
				setTimeout(() => this.isVisible = false, 1000);
			}, error => {
				this.AdminService.handleError(error);
				if (this.isVisible) {
					return;
				}
				this.isVisible = true;
				this.messageAlert = 'Thêm nhân viên thất bại';
				setTimeout(() => this.isVisible = false, 1000);
			});
		}

	}

	routerUndo(type: string): void {
		this.router.navigate(['admin/' + type]);
	}

	handleSeleted(evt) {
		var files = evt.target.files;
		var file = files[0];
		if (files && file) {
			var reader = new FileReader();
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
		}
		this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
			'data:image/jpg;base64,' + this.base64textString
		);
	}

	handleShow(event) {
		this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
			'data:image/jpg;base64,' + event
		);
	}

	_handleReaderLoaded(readerEvt) {
		var binaryString = readerEvt.target.result;
		this.base64textString = btoa(binaryString);
	}

}
