export class User {
	public username:string;
	public pass:string;
	public name:string;
	public age:number;
	public address:string;
	public sex:string;
	public role:number;
	public id:string;

	constructor(
		username:string, 
		pass:string,
		name:string,
		age:number,
		sex:string,
		address:string,
		role:number){
		this.username = username;
		this.pass = pass;
		this.name = name;
		this.age = age;
		this.address = address;
		this.sex = sex;
		this.role = role;
	}
}