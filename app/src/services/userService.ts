import {Injectable, Inject} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {LocalStorageService} from './localStorageService';

import {User} from  '../beans/user';
import {Item, Basket} from  '../beans/basket';


@Injectable()
export class UserService{

	private _isLogged: boolean = false;
	private user: User;
	private _basket: Basket;


	private storeKey = 'ecItems';

	constructor(
		@Inject(Http) private http: Http,
		@Inject(LocalStorageService) private localStorage: LocalStorageService
	){

	}


	private loadBasket= (): void => {
		
		let previousItemsStr: string = this.localStorage.getItem(this.storeKey);
		if (previousItemsStr){
			let itemsToLoad = <Item[]>JSON.parse(previousItemsStr);
			this._basket = new Basket(itemsToLoad);
		}
		else{
 			this._basket= new Basket();
		}
	}


	login= (login: string, passwd: string): Promise<User> => {

		let body = JSON.stringify({ login: login, password: passwd });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post('/api/login', body, new RequestOptions({ headers: headers }))
			.toPromise()
			.then((response: Response) => {
				return <User>response.json();
			})
			.then((user: User) => {
				this._isLogged = true;
				this.user = user;
				this.loadBasket();
				return this.user;
			});
	}

	logout= (): void => {
		this._isLogged = false;
		this.user = undefined;
		this._basket = undefined;
	}

	get isLogged(): boolean {
		return this._isLogged;
	}

	getUser= (): User => {
		return this.user;
	}

	get basket(): Basket {
		return this._basket;
	}

	storeBasket= (): void => {
		let itemsToStore= this._basket.getItems();
		//Even if it's empty
		this.localStorage.setItem(this.storeKey, JSON.stringify(itemsToStore));
	}

}