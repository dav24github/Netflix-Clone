import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MoviesInterface } from 'src/app/models/movies.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() sliderConfig!: any;
  @Input() movies!: MoviesInterface;
  @Input() title!: string;

  constructor(private movie: MovieService) {}

  ngOnInit(): void {}

  handleClick(backdropPath: string, title: string) {
    this.movie.currentItemChange(backdropPath, title);
  }
}
