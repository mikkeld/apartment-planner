"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var bucketlist_item_1 = require('./bucketlist-item');
var Subject_1 = require('rxjs/Subject');
var BucketlistService = (function () {
    function BucketlistService(storage) {
        this.storage = storage;
        this.modelCreatedEvent = new Subject_1.Subject();
        this.modelCreatedEvent$ = this.modelCreatedEvent.asObservable();
    }
    BucketlistService.prototype.getBucketlist = function () {
        var _this = this;
        return this.storage.get('/api/bucketlist').map(function (res) { return _this.transform(res.json()); });
    };
    BucketlistService.prototype.saveBucketlistItem = function (item) {
        var _this = this;
        return this.storage.post('/api/bucketlist', item).toPromise().then(function (res) {
            _this.modelCreatedEvent.next(bucketlist_item_1.BucketlistItem.createWithData(JSON.parse(res.text())));
        });
    };
    BucketlistService.prototype.deleteBucketListItem = function (item) {
        return this.storage.delete('/api/bucketlist/' + item.id).toPromise();
    };
    BucketlistService.prototype.transform = function (list) {
        return list.map(function (item) { return bucketlist_item_1.BucketlistItem.createWithData(item); });
    };
    BucketlistService = __decorate([
        core_1.Injectable()
    ], BucketlistService);
    return BucketlistService;
}());
exports.BucketlistService = BucketlistService;
