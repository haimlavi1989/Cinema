import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../../../shared/movies/Movie';
import { ModifyMovieService } from '../../../services/movies/modifyMovie/modifyMovie.service';

@Component({
  selector: 'app-modify-movie',
  templateUrl: './modify-movie.component.html',
  styleUrls: ['./modify-movie.component.css']
})
export class ModifyMovieComponent implements OnInit {

  public modalTitle: string;
  @Input('movie') movie: Movie;
  movieFormGroup: FormGroup;
  yearMinMax: number[]; //[0]=min [1]=max
  plotMinMax: number[]; //[0]=min [1]=max
  errorEmptyFields: string;
  title: FormControl;
  year: FormControl;
  poster: FormControl; 
  plot: FormControl;
  submitButtonText: string;

  constructor(private modifyMovieService: ModifyMovieService) {
    this.yearMinMax = [];
    this.plotMinMax = [];
   }

  ngOnInit(): void {
    this.submitButtonText = "Update";
    if (!this.movie) {
      this.movie = this.newObj();
      this.submitButtonText = "Add";
    }  
    this.initForm();
  }

  createFormControls() {
    this.title = new FormControl(this.movie.Title, Validators.required);
    this.year = new FormControl(this.movie.Year, [Validators.required, Validators.minLength(4), Validators.pattern(/^(19|[2-9][0-9])\d{2}/), Validators.maxLength(9)]);
    this.poster = new FormControl(this.movie.Poster, [Validators.required, Validators.pattern("https://.+")]);
    this.plot = new FormControl(this.movie.Plot, [Validators.required, Validators.minLength(2), Validators.maxLength(210)]);
  }

  initForm() {
    this.yearMinMax[0] = 4;
    this.yearMinMax[1] = 9;
    this.plotMinMax[0] = 2;
    this.plotMinMax[1] = 210;

    this.createFormControls();
    this.errorEmptyFields = "Can not be empty";
    this.movieFormGroup = new FormGroup({
      title: this.title,
      year: this.year, 
      poster: this.poster, 
      plot: this.plot
    });

  }

  getFormFields() {
      this.movie.Title = this.movieFormGroup.get('title').value;
      this.movie.Year = this.movieFormGroup.get('year').value;
      this.movie.Poster = this.movieFormGroup.get('poster').value;
      this.movie.Plot = this.movieFormGroup.get('plot').value;
  }

  newObj() {
    return new Movie(null, null, null, null, null);
   }

   calcCurrentYear() {
     return new Date().getFullYear();
   }

  onSubmit() {
    this.getFormFields();
    this.modifyMovieService.modifyMovie.emit(this.movie);
  }

  exitedit() {
    this.modifyMovieService.cancelModify.emit(true);
  }

}
