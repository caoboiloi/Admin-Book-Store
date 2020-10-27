export class Buy {
	public id:string;
	public iduser:string;
	public idshipper:string;
	public idbook:string;
	public amount:number;
	public allprice:number;
	public price:number;

	constructor(
		iduser:string,
		idshipper:string,
		idbook:string,
		amount:number,
		allprice:number,
		price:number){
		this.iduser = iduser;
		this.idshipper = idshipper;
		this.idbook = idbook;
		this.amount = amount;
		this.allprice = allprice;
		this.price = price;
	}
}