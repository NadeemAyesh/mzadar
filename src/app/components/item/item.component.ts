import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  public progress = 0.6;
  @Input() item: {
    bid_price: 0,
    body: '',
    first_price: 0,
    id: 0,
    last_price: 0,
    name: '',
    count: 0,
    image: '',
    percentage: 0.6,
    most_price: 0
  } = {
    bid_price: 0,
    body: '',
    first_price: 0,
    id: 0,
    last_price: 0,
    name: '',
    count: 0,
    image: '',
    percentage: 0.6,
    most_price: 0
  };

  constructor() { }

  ngOnInit() {
    this.progress = this.item.percentage

  }

}
