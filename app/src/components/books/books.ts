import {Component, OnInit} from '@angular/core';

import {Http, Response} from '@angular/http';

import {Book} from '../../beans/book';
import {BooksService} from '../../services/booksService';
import {UserService} from '../../services/userService';


@Component({
	selector: 'books',
	templateUrl: 'src/components/books/books.html'
})
export class Books implements OnInit{

	books: Book[]= [];
	currentPage: number = 1;

	constructor(
		private booksService: BooksService, 
		public userService: UserService) {}

	ngOnInit(){
		this.booksService.getBooks()
			.then((books: Book[]) => {
				this.books = books;
			});
	}

	switchPage(page:number){
		this.currentPage = page;
	}

	getRatingClass = this.booksService.getRatingClass;


}
