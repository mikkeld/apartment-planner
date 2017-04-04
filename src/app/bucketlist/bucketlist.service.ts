import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BucketlistItem } from './bucketlist-item';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class BucketlistService {

  private modelCreatedEvent = new Subject<BucketlistItem>();
  public modelCreatedEvent$ = this.modelCreatedEvent.asObservable();

  constructor(private storage: Http) { }

  getBucketlist() {
    return this.storage.get('/api/bucketlist').map(res => this.transform(res.json()));
  }

  saveBucketlistItem (item: BucketlistItem) {
    return this.storage.post('/api/bucketlist', item).toPromise().then(
      res => {
        this.modelCreatedEvent.next(BucketlistItem.createWithData(JSON.parse(res.text())));
      }
    );
  }

  deleteBucketListItem(item: BucketlistItem) {
    return this.storage.delete('/api/bucketlist/' + item.id).toPromise();
  }

  private transform(list) {
    return list.map(item => BucketlistItem.createWithData(item) );
  }
}
