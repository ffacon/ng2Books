import {Component} from '@angular/core';



@Component({
	selector:'contact',
	templateUrl:'src/components/contact/contact.html',
	styleUrls:['src/components/contact/contact.css']
})
export class Contact{

	email: string= 'ecommerce@worldline-sdco.com';
	phone: string= "+33 XXXXXXXXX";
	address: string= "Rue de la pointe, 59113 Seclin";	

	message: string= "";

	constructor(){}

	updateMessage(data: any){
		this.message= data.target.value;
	}

	sendMessage(){
		this.message= "";
	}

}