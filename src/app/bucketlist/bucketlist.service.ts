///<reference path="bucketlist-item.ts"/>
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BucketlistItem } from './bucketlist-item';
import { Subject } from 'rxjs/Subject';
import {AngularFire} from 'angularfire2';

@Injectable()
export class BucketlistService {

  private modelCreatedEvent = new Subject<BucketlistItem>();
  public modelCreatedEvent$ = this.modelCreatedEvent.asObservable();
  private items = this.af.database.list('/items');

  constructor(private storage: Http, private af: AngularFire) { }

  getBucketlist() {
    return this.items;
  }

  saveBucketlistItem (item: BucketlistItem) {
    const placeholderImage = 'http://vignette1.wikia.nocookie.net/towerofsaviors/images/4/47/Placeholder.png/revision/20140518072131';
    const itemFirebase = {
      name: item.name,
      price: item.price || 0,
      currency: item.currency || 'DKK',
      image: item.image || placeholderImage,
      link: item.link,
      room: item.room,
      tags: item.tags
    };
    return this.items.push(itemFirebase);
  }

  deleteBucketListItem(item: BucketlistItem) {
    return this.storage.delete('/api/bucketlist/' + item.id).toPromise();
  }

}
