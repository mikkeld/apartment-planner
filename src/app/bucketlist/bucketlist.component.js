"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var BucketlistComponent = (function () {
    function BucketlistComponent(bucketlistService) {
        var _this = this;
        this.bucketlistService = bucketlistService;
        this.filterFunction = BucketlistComponent.DEFAULT_FILTER;
        this.selectedItemId = null;
        this.filteredRoomLabel = "Room";
        this.hasFilter = false;
        this.showBulkTools = false;
        this.bucketlistService.getBucketlist().subscribe(function (bucketList) {
            _this.bucketList = _this.bucketListFiltered = bucketList;
            _this.appendBackupLink();
            _this.updateRooms();
        });
        this.bucketlistService.modelCreatedEvent$.subscribe(this.updateBucketList.bind(this));
    }
    BucketlistComponent.prototype.updateBucketList = function (model) {
        this.bucketList.push(model);
        this.updateRooms();
        this.filter();
    };
    BucketlistComponent.prototype.updateRooms = function () {
        this.rooms = this.bucketList.map(function (item) { return item.room; }).filter(function (room) { return !!room; });
        this.rooms = Array.from(new Set(this.rooms));
    };
    BucketlistComponent.prototype.filter = function () {
        this.bucketListFiltered = this.bucketList.filter(this.filterFunction);
    };
    BucketlistComponent.prototype.setKeyValueFilter = function (key, value) {
        this.filterFunction = function (item) {
            return item[key] === value;
        };
        this.filteredRoomLabel = value;
        this.hasFilter = true;
        this.filter();
    };
    BucketlistComponent.prototype.removeFilter = function () {
        this.filterFunction = BucketlistComponent.DEFAULT_FILTER;
        this.filteredRoomLabel = "Room";
        this.hasFilter = false;
        this.filter();
    };
    BucketlistComponent.prototype.selectItem = function (item) {
        this.selectedItemId = (this.selectedItemId === item.id ? null : item.id);
        this.showBulkTools = !!this.selectedItemId;
    };
    BucketlistComponent.prototype.appendBackupLink = function () {
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.bucketList));
        var container = $('body').find('#backup-container');
        $('<a id="backup-link" href="data:' + data + '" download="data.json">Backup</a>')
            .appendTo(container);
    };
    BucketlistComponent.prototype.deleteItem = function (id) {
        var _this = this;
        var item = this.bucketList.find(function (item) { return item.id === id; });
        this.bucketlistService.deleteBucketListItem(item).then(function () {
            _this.bucketList = _this.bucketList.filter(function (item) { return item.id !== id; });
            _this.filter();
            Materialize.toast('Item deleted', 4000);
        });
    };
    BucketlistComponent.DEFAULT_FILTER = function () { return true; };
    BucketlistComponent = __decorate([
        core_1.Component({
            selector: 'app-bucketlist',
            templateUrl: './bucketlist.component.html',
            styleUrls: ['./bucketlist.component.scss']
        })
    ], BucketlistComponent);
    return BucketlistComponent;
}());
exports.BucketlistComponent = BucketlistComponent;
