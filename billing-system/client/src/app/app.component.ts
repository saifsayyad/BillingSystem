import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() notify: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  getFreshBills(index: number){
    if (index === 1){
      this.notify.emit(true);
    }
    else {
      this.notify.emit(false);
    }
  }
}
