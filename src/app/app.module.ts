import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './feature/components/movies/movie/movie.component';
import { MoviesComponent } from './feature/components/movies/movies.component';
import { ConfirmationDialogComponent } from './feature/components/confirmation-dialog/confirmation-dialog.component';
import { ModifyMovieComponent } from './feature/components/movies/modify-movie/modify-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MoviesComponent,
    ConfirmationDialogComponent,
    ModifyMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
