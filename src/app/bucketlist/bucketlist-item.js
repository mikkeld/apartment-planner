"use strict";
var BucketlistItem = (function () {
    function BucketlistItem(id, name, price, currency, image, link, room, tags) {
        if (price === void 0) { price = '0'; }
        if (currency === void 0) { currency = 'dkk'; }
        if (tags === void 0) { tags = []; }
        this.tags = [];
        this.id = id;
        this.name = name;
        this.price = price;
        this.currency = currency;
        this.image = image;
        this.link = link;
        this.room = room;
        this.tags = tags;
    }
    BucketlistItem.create = function () {
        return new BucketlistItem();
    };
    BucketlistItem.createWithData = function (item) {
        var bucketlistItem = new BucketlistItem(item._id, item.name, item._price, item.currency, item.image, item.link, item.room, item.tags);
        return bucketlistItem;
    };
    Object.defineProperty(BucketlistItem.prototype, "price", {
        get: function () { return this._price; },
        set: function (price) {
            //this._price = price ? price.replace('.','').replace(',','.') : "";
            this._price = price || "";
        },
        enumerable: true,
        configurable: true
    });
    return BucketlistItem;
}());
exports.BucketlistItem = BucketlistItem;
