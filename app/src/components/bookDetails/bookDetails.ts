import {Component, OnInit} from '@angular/core';

import {Router, RouteParams} from '@angular/router-deprecated';

import {UserService} from '../../services/userService';
import {BooksService} from '../../services/booksService';
import {Book} from '../../beans/book';


@Component({
	selector: 'book-details',
	templateUrl: 'src/components/bookDetails/bookDetails.html',
	styleUrls: ['src/components/bookDetails/bookDetails.css']
})
export class BookDetails implements OnInit{

	public book: Book;

	constructor(
		private routeParams: RouteParams,
		private router: Router,
		public bookService: BooksService,
		public userService: UserService){}

	ngOnInit(): void {
		let that = this;
		let bookIdStr= this.routeParams.get('id');
		if (!bookIdStr){
			throw 'Book Id not set';
		}

		let bookId = parseInt(bookIdStr);

		this.bookService.getBook(bookId)
			.then((book: Book) => {
				that.book = book;
			});
	}


	getImagePath = (): string => {
		if (!this.book){
			return '';
		}
		return '/data/imgs/books/' + this.book.id + '.jpg';
	}


	getStarsImagePath= (): string => {
		if (!this.book){
			return '';
		}

		return '/styles/ktheme/img/' + this.bookService.convertFromRating(this.bookService.getRatingAverage(this.book)) + '-stars.svg'
	}


	addToBasket= (): void => {
		this.userService.basket.addProduct(this.book);
		this.router.navigate(['Basket']);
	}


}
