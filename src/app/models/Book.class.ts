export class Book {
	public id : string;
	public name : string;
	public page : number;
	public price : number;
	public sku : number;
	public publisher : string;
	public provider : string;
	public height : number;
	public width : number;
	public cover : string;
	public img : string;
	public description : string;
	public feature : number;
	public author : string;
	public bestselling : number;
	public sale : number;
	public bookn : number;

	constructor(
		name : string,
		page : number,
		price : number,
		sku : number,
		publisher : string,
		provider : string,
		height : number,
		width : number,
		cover : string,
		img : string,
		description : string,
		feature : number,
		author : string,
		bestselling : number,
		sale : number,
		bookn : number
	) {
		this.name = name;
		this.page = page;
		this.price = price;
		this.sku = sku;
		this.publisher = publisher;
		this.provider = provider;
		this.height = height;
		this.width = width;
		this.cover = cover;
		this.img = img;
		this.description = description;
		this.feature = feature;
		this.author = author;
		this.bestselling = bestselling;
		this.sale = sale;
		this.bookn = bookn;
	}

	public getName():string {
		return this.name;
	}
	public setName(name:string):void {
		this.name = name;
	}
	
	public getPage():number {
		return this.page;
	}
	public setPage(page:number):void {
		this.page = page;
	}
	
	public getPrice():number {
		return this.price;
	}
	public setPrice(price:number):void {
		this.price = price;
	}
	
	public getSKU():number {
		return this.sku;
	}
	public setSKU(sku:number):void {
		this.sku = sku;
	}
	
	public getPublisher():string {
		return this.publisher;
	}
	public setPublisher(publisher:string):void {
		this.publisher = publisher;
	}
	
	public getHeight():number {
		return this.height;
	}
	public setHeight(height:number):void {
		this.height = height;
	}
	
	public getWidth():number {
		return this.width;
	}
	public setWidth(width:number):void {
		this.width = width;
	}
	
	public getCover():string {
		return this.cover;
	}
	public setCover(cover:string):void {
		this.cover = cover;
	}
	
	public getImg():string {
		return this.img;
	}
	public setImg(img:string):void {
		this.img = img;
	}
	
	public getDescription():string {
		return this.description;
	}
	public setDescription(description:string):void {
		this.description = description;
	}
	
	public getFeature():number {
		return this.feature;
	}
	public setFeature(feature:number):void {
		this.feature = feature;
	}
	
	public getProvider():string {
		return this.provider;
	}
	public setProvider(provider:string):void {
		this.provider = provider;
	}

	public getAuthor():string {
		return this.author;
	}
	public setAuthor(author:string):void {
		this.author = author;
	}

	public getBestselling():number {
		return this.bestselling;
	}
	public setBestselling(bestselling:number):void {
		this.bestselling = bestselling;
	}

	public getSale():number {
		return this.sale;
	}
	public setSale(sale:number):void {
		this.sale = sale;
	}

	public getNewbook():number{
		return this.bookn;
	}
	public setNewbook(bookn:number):void {
		this.bookn = bookn;
	}
}