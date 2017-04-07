import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {BucketlistItem} from '../../bucketlist/bucketlist-item';

@Injectable()
export class InspirationService {

  private allItems: FirebaseListObservable<BucketlistItem[]>;
  private items = this.af.database.list('/items');
  private budget = this.af.database.object('/budget');

  constructor(private af: AngularFire) {
    this.allItems = this.items;
  }

  getItems(): FirebaseListObservable<BucketlistItem[]> {
    return this.items;
  }

  getBudget(): FirebaseObjectObservable<string> {
    return this.budget;
  }

  setBudget(budget: string): void {
    this.budget.set({ limit: budget});
  }

  updateBucketStatus(item: BucketlistItem): void {
    this.af.database.object(`/items/${item.$key}`)
      .update({bucketed: !item.bucketed });
  }

}

