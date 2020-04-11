import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ConfirmationDialogService {

  // ok=true, cancel/exit=false
  buttonChoice = new EventEmitter<boolean>();

  constructor() { }

}
