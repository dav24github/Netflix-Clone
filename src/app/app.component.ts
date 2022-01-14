import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesInterface } from './models/movies.interface';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  sticky = false;
  subs: Subscription[] = [];
  trending!: MoviesInterface;
  popular!: MoviesInterface;
  topRated!: MoviesInterface;
  originals!: MoviesInterface;
  nowPlaying!: MoviesInterface;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  @ViewChild('stickHeader') header!: ElementRef;

  headerBGUrl: string = '';
  currentTitle!: string;

  constructor(private movie: MovieService) {}

  ngOnInit(): void {
    this.subs.push(
      this.movie.getTrending().subscribe((data) => {
        this.trending = data;
        this.headerBGUrl =
          'https://image.tmdb.org/t/p/original' +
          this.trending.results![0].backdrop_path;
        this.currentTitle = this.trending.results![0].title;
      })
    );
    this.subs.push(
      this.movie.getPopularMovies().subscribe((data) => {
        this.popular = data;
      })
    );
    this.subs.push(
      this.movie.getTopRated().subscribe((data) => {
        this.topRated = data;
      })
    );
    this.subs.push(
      this.movie.getOriginals().subscribe((data) => {
        this.originals = data;
      })
    );
    this.subs.push(
      this.movie.getNowPlaying().subscribe((data) => {
        this.nowPlaying = data;
      })
    );

    this.movie.currentItem.subscribe((data: string[]) => {
      this.currentTitle = data[1];
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + data[0];
    });
  }

  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event.target']) // Second arg will be the arg (DOM) we want to access
  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
