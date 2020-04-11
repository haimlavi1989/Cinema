import { Injectable } from '@angular/core';
import { Movie } from '../../shared/movies/Movie';
import { HttpClient } from '@angular/common/http';

const moviesUrl = "https://www.omdbapi.com/?s=";
const titlesUrl = "https://www.omdbapi.com/?t=";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public movies: Movie[] = [];
  private apiKey = "71e91ace";

  constructor(private httpRequest: HttpClient) { }

  searchMoviesByTitle(movieTitle: string) {
    return this.httpRequest.get<Movie[]>(moviesUrl+movieTitle+"&apikey="+this.apiKey);
  }

  getMoviesDetailsByTitle(movieTitle: string) {
    return this.httpRequest.get<Movie>(titlesUrl+movieTitle+"&apikey="+this.apiKey);
  }
}
