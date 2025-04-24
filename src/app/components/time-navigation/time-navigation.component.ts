import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vis-tool-time-navigation',
  templateUrl: './time-navigation.component.html',
  styleUrls: ['./time-navigation.component.scss'],
})
export class TimeNavigationComponent {
  @Input() timestamps: string[] = [];
  @Input() currentIndex: number = 0;
  @Output() navigate = new EventEmitter<number>();

  onPrevious() {
    if (this.currentIndex > 0) {
      this.navigate.emit(this.currentIndex - 1);
    }
  }

  onNext() {
    if (this.currentIndex < this.timestamps.length - 1) {
      this.navigate.emit(this.currentIndex + 1);
    }
  }
}
