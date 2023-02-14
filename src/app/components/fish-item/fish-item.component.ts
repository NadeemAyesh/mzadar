import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fish-item',
  templateUrl: './fish-item.component.html',
  styleUrls: ['./fish-item.component.scss'],
})
export class FishItemComponent implements OnInit {

  @Input() item: {
    active: '',
    body: '',
    category_id: 0,
    created_at: '',
    deleted_at: '',
    id: 0,
    name: '',
    old_price: 0,
    price: 0,
    quantity: 0,
    updated_at:'',
    image: ''
  } = {
    active: '',
    body: '',
    category_id: 0,
    created_at: '',
    deleted_at: '',
    id: 0,
    name: '',
    old_price: 0,
    price: 0,
    quantity: 0,
    updated_at:'',
    image: ''
  };

  constructor() { }

  ngOnInit() {}

}
