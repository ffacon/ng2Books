import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Router} from '@angular/router-deprecated';

import {User} from '../../beans/user';
import {UserService} from '../../services/userService';

@Component({
	selector: 'login',
	templateUrl: 'src/components/login/login.html'
})
export class Login {

	errorMessage: string= undefined;
	// loggedUser: User;

	//Form fields
	login: string;
	password: string;

	constructor(private router: Router, private userService: UserService) {}


	logUser= () => {

		this.userService.login(this.login, this.password)
			.then((user: User) => {
				this.router.navigate(['Home']);
			})
			.catch((err: Response) => {
				console.error(err);
				this.errorMessage = `Server answer status: ${err.status}`;
				if (err.status === 401){
					this.errorMessage += ' (unauthorized)';
				}
			});

	}




}
