import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BucketlistItem } from './bucketlist-item';
import { BucketlistService } from './bucketlist.service';
declare var $, Materialize;

@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.scss']
})
export class BucketlistComponent {

  bucketList: BucketlistItem[];
  bucketListFiltered: BucketlistItem[];
  rooms: string[];

  filterFunction: (item: BucketlistItem) => boolean = BucketlistComponent.DEFAULT_FILTER;

  selectedItemId: string = null;
  filteredRoomLabel = 'Room';
  hasFilter = false;
  showBulkTools = false;

  private static DEFAULT_FILTER = () => true;

  constructor(private bucketlistService: BucketlistService) {
    this.bucketlistService.getBucketlist().subscribe(bucketList => {
      this.bucketList = this.bucketListFiltered = bucketList;
      this.appendBackupLink();
      this.updateRooms();
    });
    this.bucketlistService.modelCreatedEvent$.subscribe(this.updateBucketList.bind(this));
  }

  private updateBucketList(model: BucketlistItem) {
    this.bucketList.push(model);
    this.updateRooms();
    this.filter();
  }

  private updateRooms() {
    this.rooms = this.bucketList.map((item) => item.room).filter((room) => !!room);
    this.rooms = Array.from(new Set(this.rooms));
  }

  private filter() {
    this.bucketListFiltered = this.bucketList.filter(this.filterFunction);
  }

  private setKeyValueFilter(key, value) {
    this.filterFunction = (item: BucketlistItem) => {
      return item[key] === value;
    };
    this.filteredRoomLabel = value;
    this.hasFilter = true;
    this.filter();
  }

  private removeFilter() {
    this.filterFunction = BucketlistComponent.DEFAULT_FILTER;
    this.filteredRoomLabel = 'Room';
    this.hasFilter = false;
    this.filter();
  }


  selectItem(item: BucketlistItem) {
    console.log(item.$key);
    this.selectedItemId = (this.selectedItemId === item.$key ? null : item.$key);
    this.showBulkTools = !!this.selectedItemId;
  }

  appendBackupLink() {
    const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.bucketList));
    const container = $('body').find('#backup-container');
    $('<a id="backup-link" href="data:' + data + '" download="data.json">Backup</a>')
    .appendTo(container);
  }

  deleteItem(id: string) {
    this.bucketlistService.deleteBucketListItem(id)
      .then(() => {
        Materialize.toast('Item deleted', 4000);
      });
  }

}
