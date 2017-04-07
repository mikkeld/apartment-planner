import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {BucketlistItem} from '../../bucketlist/bucketlist-item';

@Component({
  selector: 'app-inspiration-list',
  templateUrl: './inspiration-list.component.html',
  styleUrls: ['./inspiration-list.component.css']
})
export class InspirationListComponent implements OnInit, Input {
  @Input() items: BucketlistItem[];
  @Output() onToggle = new EventEmitter<BucketlistItem>();

  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  toggleItem(item: BucketlistItem) {
    this.onToggle.emit(item);
  }

  constructor() { }

  ngOnInit() {
  }

}
