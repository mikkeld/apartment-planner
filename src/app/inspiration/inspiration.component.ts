import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {BucketlistItem} from '../bucketlist/bucketlist-item';
import {InspirationService} from './shared/inspiration.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.scss']
})
export class InspirationComponent implements OnInit {

  items: any;
  budget: FirebaseObjectObservable<string>;
  slideToggleModel = false;

  constructor(public inspirationService: InspirationService) { }

  ngOnInit() {
    this.budget = this.inspirationService.getBudget();
    this.items = this.inspirationService.getItems();
  }

  onChecked() {
    this.items = this.inspirationService.getItems()
      .map(items => {
        return items.filter(item => {
          if (this.slideToggleModel) {
            return item.bucketed === this.slideToggleModel;
          } else {
            return item;
          }
        });
      });
  }

}
