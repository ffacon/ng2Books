import {Injector, ReflectiveInjector, provide} from '@angular/core';
import {inject, describe, beforeEach, it} from '@angular/core/testing/testing';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {BooksService} from './booksService';
import {Book, Comment} from '../beans/book';

import {Http, Response, ResponseOptions} from '@angular/http';

export function main(){

	describe('BookService', () => {

		let parentInjector: Injector;
		let bookService: BooksService;
		let book: Book;
		let booksResponse: Response;

		beforeEach(() => {

			book = {
				"id": 1,
				"name": "AngularJS",
				"author": "Brad Green, Shyam Seshadri",
				"price": 15.34,
				"description": "Description...",
				"category": "book",
				"isNew": false,
				"comments": [
					{
						"rate": 2,
						"user": "Laurent Wroblewski",
						"comment": "Test comment"
					},
					{
						"rate": 4,
						"user": "Pierre Marot",
						"comment": "my comment..."
					}
				]
			};

			booksResponse = new Response(new ResponseOptions({ body: JSON.stringify([book]) }));

			parentInjector = ReflectiveInjector.resolveAndCreate([
				BooksService,
				provide(
					Http,
					{
						useValue: {
							get: function() {
								return Observable.of(booksResponse);
							}
						}
				})
			]);

			bookService = parentInjector.get(BooksService);
		});


		it('getBooks', (done:any) => {

			book.rating = 3;

			bookService.getBooks()
			.then((books: Book[]) => {
				expect(books[0]).toEqual(book);
				done();
			});

		});

		it('getBook with results', (done: any) => {

			book.rating = 3;

			bookService.getBook(book.id)
				.then((currentBook: Book) => {
					expect(currentBook).toEqual(book);
					done();
				});

		});

		it('getBook without results', (done: any) => {

			let nbBooks = 0, bookId = 5;
			bookService.getBook(bookId)
				.then( (currentBook: Book) => {
					expect(currentBook).toBeUndefined();
					done();
				} );
		});


	});

}