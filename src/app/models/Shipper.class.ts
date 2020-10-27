export class Shipper {
	public id:string;
	public name:string;
	public price:number;

	constructor(
		name:string,
		price:number
		){
		this.name = name;
		this.price = price;
	}
}