export class Author {
	private id:string;
	private name:string;

	constructor(name:string){
		this.name = name;
	}

	public getName():string {
		return this.name;
	}
	public setName(name:string):void{
		this.name = name;
	}

	public getId():string {
		return this.id;
	}
	public setId(id:string):void {
		this.id = id;
	}
}