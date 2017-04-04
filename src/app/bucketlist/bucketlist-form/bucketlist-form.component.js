"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var bucketlist_item_1 = require('../bucketlist-item');
var BucketlistFormComponent = (function () {
    function BucketlistFormComponent(bucketlistService) {
        this.bucketlistService = bucketlistService;
        this.model = bucketlist_item_1.BucketlistItem.create();
        this.chipsPlaceholder = {
            placeholder: '+Tag',
            secondaryPlaceholder: 'Tags',
        };
    }
    BucketlistFormComponent.prototype.onDrop = function (data) {
    };
    BucketlistFormComponent.prototype.tagAdded = function (tagInfo) {
        this.model.tags.push(tagInfo.tag);
    };
    BucketlistFormComponent.prototype.tagDeleted = function (tagInfo) {
        this.model.tags = this.model.tags.filter(function (t) { return t !== tagInfo.tag; });
    };
    BucketlistFormComponent.prototype.saveItem = function () {
        var _this = this;
        this.bucketlistService.saveBucketlistItem(this.model)
            .then(function (res) {
            Materialize.toast('Item saved', 4000);
            _this.closeForm();
        })
            .catch(function (error) {
            Materialize.toast('Error while saving', 4000);
        });
    };
    BucketlistFormComponent.prototype.closeForm = function () {
        $('#modal').modal('close');
    };
    BucketlistFormComponent.prototype.reset = function () {
        this.model = bucketlist_item_1.BucketlistItem.create();
        $('label').removeClass('active');
    };
    BucketlistFormComponent.prototype.change = function (prop, newValue) {
        if (newValue === null)
            return;
        this.model[prop] = newValue;
    };
    BucketlistFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $('.modal').modal({
            out_duration: 0,
            in_duration: 0
        });
        $('select').material_select();
        $('.chips-placeholder').material_chip({
            placeholder: '+ Tag',
            secondaryPlaceholder: 'Item Tags',
        });
        // OMG H4X FØØØØJ
        $('select#room').on('change', function (e) {
            var val = $(e.target).val();
            _this.change('room', val);
        });
        $('input.select-dropdown').focus(function () { return $('#modal').addClass('showOverflow'); });
        $('input').not('.select-dropdown').focus(function () { return $('#modal').removeClass('showOverflow'); });
    };
    BucketlistFormComponent = __decorate([
        core_1.Component({
            selector: 'bucketlist-form',
            templateUrl: './bucketlist-form.component.html',
            styleUrls: ['./bucketlist-form.component.scss']
        })
    ], BucketlistFormComponent);
    return BucketlistFormComponent;
}());
exports.BucketlistFormComponent = BucketlistFormComponent;
