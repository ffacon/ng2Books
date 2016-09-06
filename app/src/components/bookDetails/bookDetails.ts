import {Component, OnInit} from '@angular/core';

import {RouteParams} from '@angular/router-deprecated';

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
		return '';
	}


	getStarsImagePath= (): string => {
		return '';
	}


}
