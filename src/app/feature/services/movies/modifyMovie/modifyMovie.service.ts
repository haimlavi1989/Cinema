import { Injectable, EventEmitter } from '@angular/core';
import { Movie } from '../../../shared/movies/Movie';

@Injectable({
  providedIn: 'root'
})


export class ModifyMovieService {

  public modifyMovie;
  public cancelModify;

  constructor() { 
    this.modifyMovie  = new EventEmitter<Movie>();
    this.cancelModify = new EventEmitter<Movie>();
  }

}
