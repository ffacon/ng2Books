import {Component, provide, AfterViewInit} from '@angular/core';
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {HTTP_PROVIDERS} from '@angular/http';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {
	ROUTER_PROVIDERS,
	ROUTER_DIRECTIVES
} from '@angular/router-deprecated'; 

import {Basket} from '../basket/basket';
import {Login} from '../login/login';
import {Profile} from '../profile/profile';
import {Books} from '../books/books';
import {BookDetails} from '../bookDetails/bookDetails';
import {Home} from '../home/home';
import {Contact} from '../contact/contact';

import {UserService} from '../../services/userService';
import {BooksService} from '../../services/booksService';
import {DataContainerService} from '../../services/dataContainerService';
import {LocalStorageService} from '../../services/localStorageService';
import {ContactService} from '../../services/contactService';
 

@Component({
	selector: 'app',
	styleUrls:['src/components/app/app.css'],
	templateUrl: 'src/components/app/app.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [UserService, BooksService, DataContainerService, LocalStorageService]
})
@RouteConfig([
		{ component: Basket, name: 'Basket', path: '/basket' },
		{ component: Login, name: 'Login', path: '/login' },
		{ component: Profile, name: 'Profile', path: '/profile' },
		{ component: Books, name: 'Books', path: '/books' },
		{ component: BookDetails, name: 'BookDetails', path: '/book/:id' },
		{ component: Contact, name: 'Contact', path: '/contact' },
		{ component: Home, name: 'Home', path: '/home', useAsDefault: true }
])
export class App{

	constructor(private router: Router, public userService: UserService) {}

	logout= (): boolean => {
		this.userService.logout();
		this.router.navigate(['Home']);
		return false;
	}

}

const ALL_ROUTER_BINDINGS: Array<any> = [
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
	provide(APP_BASE_HREF, { useValue: '/' })
];

const ALL_BINDINGS: Array<any> = [
	ALL_ROUTER_BINDINGS,
	HTTP_PROVIDERS,
	ContactService
];

bootstrap(App, [ALL_BINDINGS]);