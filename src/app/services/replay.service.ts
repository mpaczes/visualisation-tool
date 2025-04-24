import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReplayService {
  private replaySubject = new BehaviorSubject<number>(0);
  private replayInterval = 20000;
  private subscription: Subscription | null = null;

  getReplayObservable() {
    return this.replaySubject.asObservable();
  }

  startReplay(totalSnapshots: number) {
    let index = 0;
    this.subscription = interval(this.replayInterval / totalSnapshots).subscribe(() => {
      this.replaySubject.next(index);
      index = (index + 1) % totalSnapshots;
    });
  }

  stopReplay() {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
}
