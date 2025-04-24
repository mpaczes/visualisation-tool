import { Component, Input } from '@angular/core';
import { OrderBookSnapshot } from 'src/app/models/trading-data.model';

@Component({
  selector: 'vis-tool-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
})
export class OrderBookComponent {
  @Input() snapshot: OrderBookSnapshot | null = null;

  displayedColumns: string[] = ['price', 'quantity', 'totalAmount'];
}
