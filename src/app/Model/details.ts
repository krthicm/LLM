export class Details{
constructor( public softwareid: number,
	public systemid: string,
	public name: string,
	public mailid: string,
	public  productname: string,
	public vendorname: string,
	public duration: number,
	public cost: number,
	public installationdate: Date,
	public expirydate: Date,
	public validity: number,
	public softwarestatus: string){}
}