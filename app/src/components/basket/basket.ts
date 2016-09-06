import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {UserService} from '../../services/userService';
import {Book} from '../../beans/book';
import {Basket as BasketBean, Item} from '../../beans/basket';


@Component({
	selector: 'basket',
	templateUrl: 'src/components/basket/basket.html',
	styleUrls: ['src/components/basket/basket.css'],
	directives: [ROUTER_DIRECTIVES]
})
export class Basket {

	items: Item[];

	constructor(private userService: UserService) {
		this.updateItems();
	}

	updateItems= (): void => {
		this.items = this.userService.basket.getItems();
	}

	removeProduct = (book: Book) => {
		this.userService.basket.removeProduct(book);
		this.updateItems();
		return false;
	}


	getTotal= (): number => {

		let res = 0;

		this.items.forEach( (item: Item) => {
			res += item.product.price * item.qty;
		} );

		return res;
	}

	storeBasket = this.userService.storeBasket;

}
