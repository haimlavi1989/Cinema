import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ConfirmationDialogService } from '../../services/confirmation-dialog/ConfirmationDialog.service'


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() message: string;

  constructor(private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
      if (!this.message) {
        this.message = 'Are you sure?';
      }
  }

  buttonChoice(confirmOrCancel: boolean) {
    this.confirmationDialogService.buttonChoice.emit(confirmOrCancel);
  }

}
