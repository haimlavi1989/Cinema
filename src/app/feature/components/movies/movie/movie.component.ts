import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../shared/movies/movie';
import { MovieService } from '../../../services/movies/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input('movie') movie: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.movieService.deleteMove.emit(this.movie);
  }

  onEdite() {
    this.movieService.modifyMove.emit(this.movie);
  }

}
