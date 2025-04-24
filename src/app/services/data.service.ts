import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, OrderBookSnapshot } from '../models/trading-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/data/trading-data.json';

  constructor(private http: HttpClient) {}

  getTradingData(): Observable<OrderBookSnapshot[]> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((data: any[]) => {
        // console.log('DataService - data : ', data);

        const orderBookSnapshots: OrderBookSnapshot[] = [];

        for (const tradingData of data) {
          const orderBookSnapshot: OrderBookSnapshot = { timestamp: '', bids: [], asks: [] };

          // timestamp
          orderBookSnapshot.timestamp = tradingData['Time'];

          // // ask order
          // for (let index = 1; index <= 10; index++) {
          //   const askOrder: Order = { price: 0, quantity: 0 };
          //   askOrder.price = tradingData[`Ask${index}`];
          //   askOrder.quantity = tradingData[`Ask${index}Size`];
          //   orderBookSnapshot.asks.push(askOrder);
          // }

          // // bid order
          // for (let index = 1; index <= 10; index++) {
          //   const bidOrder: Order = { price: 0, quantity: 0 };
          //   bidOrder.price = tradingData[`Bid${index}`];
          //   bidOrder.quantity = tradingData[`Bid${index}Size`];
          //   orderBookSnapshot.bids.push(bidOrder);
          // }

          orderBookSnapshot.asks = this.createOrders(tradingData, 'Ask');
          orderBookSnapshot.bids = this.createOrders(tradingData, 'Bid');

          // add order book snapshot to the array
          orderBookSnapshots.push(orderBookSnapshot);
        }

        return orderBookSnapshots;
      }))
  }

  private createOrders(tradingData: any, type: 'Ask' | 'Bid'): Order[] {
    const orders: Order[] = [];

    for (let index = 1; index <= 10; index++) {
      const order: Order = { price: 0, quantity: 0 };
      order.price = tradingData[`${type}${index}`];
      order.quantity = tradingData[`${type}${index}Size`];
      orders.push(order);
    }

    return orders;
  }
}
