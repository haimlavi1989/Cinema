import { Injectable, EventEmitter } from '@angular/core';
import { Movie } from '../../../shared/movies/Movie';

@Injectable({
  providedIn: 'root'
})


export class MovieService {

  public deleteMove;
  public modifyMove;

  constructor() { 
    this.deleteMove = new EventEmitter<Movie>();
    this.modifyMove = new EventEmitter<Movie>()
  }

}
