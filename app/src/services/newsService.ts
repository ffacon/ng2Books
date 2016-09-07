import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {News} from '../beans/news';

@Injectable()
export class NewsService{

	private theNews: Promise<News[]>;

	constructor(private http: Http){}

	getNews= (): Promise<News[]> => {

		if (!this.theNews){
			this.theNews = this.http.get('/api/news')
				.toPromise()
				.then((response: Response): Array<News> => {
					return <Array<News>>response.json();
				});
		}

		return this.theNews;
	}

	addLike= (news: News) => {
		this.http.post('/api/news/like/' + news.id, '')
			.toPromise()
			.then((response: Response): News => {
				return <News>response.json();
			})
			.then((updatedNews: News) => {
				news.likes = updatedNews.likes;
			});
	}

	deleteNews= (news: News) => {

		return this.http.delete('/api/news/' + news.id)
			.toPromise()
			.then((response: Response) => {
				this.theNews = this.getNews().then((allnews: News[]) => {
					return allnews.filter((currentNews: News) => currentNews.id !== news.id)
				});
			});

	}

	addNews= (news: News) => {

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let postOptions= new RequestOptions({ headers: headers});

		return this.http.post('/api/news', JSON.stringify(news), postOptions)
		.toPromise()
		.then( (response: Response) => {
			let addedNews: News = <News>response.json();
			this.theNews = this.theNews.then( (allNews: News[]) => {
				allNews.push(news);
				return allNews;
			} );
		} );
	}

	randomNews= (): Promise<News> => {

		return this.http.get('/api/news/random')
			.toPromise()
			.then((response: Response) => {
				return <News>response.json();
			});

	}





}