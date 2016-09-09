import {Component} from '@angular/core';
import {FormBuilder, ControlGroup, Control, Validators} from '@angular/common';

import {ContactService} from '../../services/contactService';


function containsValidCharacters(c:Control){

	let specialChars= ['\\','<', '>', '&' ];
  
	for (let i in specialChars){
		if ( c.value !== undefined && c.value.indexOf(specialChars[i]) != -1 ){
		  return {'containsValidCharacters': true };
		}
	}
	return null;
}


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

	_controlGroup: ControlGroup;

	constructor(contactService: ContactService,  fb: FormBuilder){

		this.email= contactService.email;
		this.phone= contactService.phone;
		this.address= contactService.address;
		
		this._controlGroup= fb.group({
			'message': new Control('', Validators.compose([Validators.required, containsValidCharacters]))
		});

	}

	get controlGroup(){
		return this._controlGroup;
	}

	updateMessage(data: any){
		this.message= data.target.value;
	}

	sendMessage(){
		this.message= "";
	}

}