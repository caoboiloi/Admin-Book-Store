export class Admin {
	public id:string;
	public name:string;
	public pass:string;
	public username:string;
	public role:number;
	public access:number;

	constructor(name:string,pass:string,username:string,role:number,access:number) {
		this.name = name;
		this.pass = pass;
		this.username = username;
		this.role = role;
		this.access = access;
	}
}