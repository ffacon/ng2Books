import {Component, OnInit} from '@angular/core';

import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Http, Response} from '@angular/http';

import {Book} from '../../beans/book';
import {BooksService} from '../../services/booksService';
import {UserService} from '../../services/userService';
import {DataContainerService} from '../../services/dataContainerService';

import {KPagination} from '../kpagination/kpagination';

import {FilterFieldPipe} from '../../pipes/filterFieldPipe';
import {UpdateDataPipe} from '../../pipes/updateDataPipe';
import {OrderByPipe} from '../../pipes/orderByPipe';


@Component({
	selector: 'books',
	templateUrl: 'src/components/books/books.html',
	directives: [ROUTER_DIRECTIVES, KPagination],
	pipes: [FilterFieldPipe, UpdateDataPipe, OrderByPipe]
})
export class Books implements OnInit{

	books: Book[]= [];
	currentPage: number = 1;

	//pagination filters
	bookNameFilter: string = '';
	booksPerPageFilter: number = 4;
	reverseOrderFilter: boolean = false;

	constructor(
		private router: Router,
		private booksService: BooksService, 
		public userService: UserService,
		public dataContainer: DataContainerService ) {}

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

	addToBasket= (book: Book) : void => {
		this.userService.basket.addProduct(book);
		this.router.navigate(['Basket']);
	}


}
