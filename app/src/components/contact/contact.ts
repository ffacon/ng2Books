import {Component} from '@angular/core';

import {ContactService} from '../../services/contactService';



@Component({
	selector:'contact',
	templateUrl:'src/components/contact/contact.html',
	styleUrls:['src/components/contact/contact.css']
})
export class Contact{

	email: string;
	phone: string;
	address: string;

	message: string= "";

	constructor(contactService: ContactService){

		this.email= contactService.email;
		this.phone= contactService.phone;
		this.address= contactService.address;

	}

	updateMessage(data: any){
		this.message= data.target.value;
	}

	sendMessage(){
		this.message= "";
	}

}