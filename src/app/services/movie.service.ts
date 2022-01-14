import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviesInterface } from '../models/movies.interface';

const enum endpoint {
  latest = '/movie/latest',
  now_playing = '/movie/now_playing',
  popular = '/movie/popular',
  top_rated = '/movie/top_rated',
  upcoming = '/movie/upcoming',
  trending = '/trending/all/week',
  originals = '/discover/tv',
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private URL = 'https://api.themoviedb.org/3';
  private api_key = environment.api;

  public currentItem = new Subject<string[]>();

  constructor(private http: HttpClient) {}

  getLatestMovie(): Observable<MoviesInterface> {
    return this.http.get<MoviesInterface>(`${this.URL}${endpoint.latest}`, {
      params: {
        api_key: this.api_key,
      },
    });
  }

  getNowPlaying(): Observable<MoviesInterface> {
    return this.http.get<MoviesInterface>(
      `${this.URL}${endpoint.now_playing}`,
      {
        params: {
          api_key: this.api_key,
        },
      }
    );
  }

  getOriginals(): Observable<MoviesInterface> {
    return this.http.get<MoviesInterface>(`${this.URL}${endpoint.originals}`, {
      params: {
        api_key: this.api_key,
      },
    });
  }

  getPopularMovies(): Observable<MoviesInterface> {
    return this.http.get<MoviesInterface>(`${this.URL}${endpoint.popular}`, {
      params: {
        api_key: this.api_key,
      },
    });
  }

  getTopRated(): Observable<MoviesInterface> {
    return this.http.get<MoviesInterface>(`${this.URL}${endpoint.top_rated}`, {
      params: {
        api_key: this.api_key,
      },
    });
  }

  getTrending(): Observable<MoviesInterface> {
    return this.http.get<MoviesInterface>(`${this.URL}${endpoint.trending}`, {
      params: {
        api_key: this.api_key,
      },
    });
  }

  currentItemChange(backdrop_path: string, title: string) {
    this.currentItem.next([backdrop_path, title]);
  }
}
