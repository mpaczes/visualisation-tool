import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderBookSnapshot } from './models/trading-data.model';
import { DataService } from './services/data.service';
import { ReplayService } from './services/replay.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vis-tool-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  tradingData: OrderBookSnapshot[] = [];
  currentSnapshot: OrderBookSnapshot | null = null;
  currentIndex: number = 0;
  tradingDataSubscription: Subscription = new Subscription();
  replaySubscription: Subscription = new Subscription();

  constructor(private dataService: DataService, private replayService: ReplayService) {}

  ngOnInit() {
    this.tradingDataSubscription = this.dataService.getTradingData().subscribe((data: OrderBookSnapshot[]) => {
      this.tradingData = data;
      this.currentSnapshot = this.tradingData[0];
    });

    this.replaySubscription = this.replayService.getReplayObservable().subscribe((index) => {
      this.currentIndex = index;
      this.currentSnapshot = this.tradingData[index];
    });
  }

  ngOnDestroy() {
    this.tradingDataSubscription.unsubscribe();
    this.replaySubscription.unsubscribe();
  }

  onNavigate(index: number) {
    this.currentIndex = index;
    this.currentSnapshot = this.tradingData[index];
  }

  onStartReplay() {
    this.replayService.startReplay(this.tradingData.length);
  }

  onStopReplay() {
    this.replayService.stopReplay();
  }

  getTimestamps() {
    return this.tradingData.map((d) => d.timestamp);
  }
}
