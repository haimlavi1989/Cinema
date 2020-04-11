import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { MovieService } from '../../services/movies/movie/movie.service';
import { ModifyMovieService } from '../../services/movies/modifyMovie/modifyMovie.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog/ConfirmationDialog.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../shared/movies/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService, ConfirmationDialogService]
})
export class MoviesComponent implements OnInit, OnDestroy {

  private searchMoviesByTitleSub: Subscription;
  private getMoviesDetailsByTitleSub: Subscription;
  private modifyStatusSubscribe: Subscription;
  private searchKey: string;
  public movies: Movie[] = [];
  @Output() dialogMessage: string;
  public modifiedMovie: Movie;
  public showDeleteMoveDialog: boolean;
  public showModifyMoveForm: boolean;

  constructor(
    private moviesService: MoviesService,
    private movie_Service: MovieService,
    private confirmationDialogService: ConfirmationDialogService,
    private modifyMovieService: ModifyMovieService
    ) { }

  ngOnInit(): void {
    this.searchKey = "x-men";
    this.showDeleteMoveDialog = false;
    this.showModifyMoveForm = false;
    this.getMoviesFromServer();
    this.movieDeleteEvent();
    this.movieModifyEvent();
  }

  getMoviesFromServer() {
    this.searchMoviesByTitleSub = 
      this.moviesService.searchMoviesByTitle(this.searchKey).subscribe(movies => {
        movies["Search"].forEach( movie => {
            this.getMoviesDetailsByTitleSub = 
              this.moviesService.getMoviesDetailsByTitle(movie.Title)
              .subscribe( moviesdetails => {
                this.movies.push( moviesdetails );
              });
        });
      });
  }

  movieDeleteEvent() {
      let movie: Movie;
      this.movie_Service.deleteMove.subscribe(
        resultMovie => {
          movie=resultMovie;
          this.dialogMessage = 'Delete "'+ movie.Title +'" item?';
          this.showDeleteMoveDialog = true;
          this.dialogActionEvent(movie.imdbID); 
        }
      )
  }
  
  dialogActionEvent(movieId) {
    let dialogActionEvent: Subscription;
    dialogActionEvent = this.confirmationDialogService.buttonChoice.subscribe(
      buttonChoice => { 
        if (buttonChoice===true) {
            this.showDeleteMoveDialog = false;
            this.deleteMovie(movieId);
            dialogActionEvent.unsubscribe();
        } else if(buttonChoice===false){
            this.showDeleteMoveDialog = false;
            dialogActionEvent.unsubscribe();
        }
    });
  }

  movieModifyEvent() {
    this.movie_Service.modifyMove.subscribe(
      resultMovie => {
        this.modifiedMovie=resultMovie;
        this.showModifyMoveForm = true;
        this.modifyStatusEvent();
        this.modifyUpdateMovie();
      }
    )
  }

  modifyStatusEvent() {
      this.modifyStatusSubscribe = this.modifyMovieService.cancelModify.subscribe(
      cancelModify => {
        if (cancelModify === true ) {
          this.showModifyMoveForm = false;
          this.modifyStatusSubscribe.unsubscribe();
        }
      })
  }

  modifyUpdateMovie() {
    let modifyUpdateMovie: Subscription;
    modifyUpdateMovie = this.modifyMovieService.modifyMovie.subscribe(
      ModifyMovie => {
         this.replaceOldMovieObject(ModifyMovie);
         this.showModifyMoveForm = false;
         modifyUpdateMovie.unsubscribe();
         this.modifyStatusSubscribe.unsubscribe();
      })
  }

  replaceOldMovieObject(modifyMove: Movie) {
    let itemIndex = this.movies.findIndex(item => item.imdbID == modifyMove.imdbID);
    if ( itemIndex !== -1) {
      this.movies[itemIndex] = modifyMove;
    } else {
      this.addNewMovieObject(modifyMove);
    }
  }

  addNewMovieObject(newMovie: Movie) {
    newMovie.imdbID = this.genarateId().toDateString();
    this.movies.push(newMovie);
  }

  genarateId() {
     return new Date();
  }

  deleteMovie(movieId) {
    this.movies = this.movies.filter(item => item.imdbID !== movieId);
  }

  onAddMovie() {
    this.movie_Service.modifyMove.emit(null);
  }

  ngOnDestroy() {
      this.searchMoviesByTitleSub.unsubscribe();
      this.getMoviesDetailsByTitleSub.unsubscribe();
  }

}
