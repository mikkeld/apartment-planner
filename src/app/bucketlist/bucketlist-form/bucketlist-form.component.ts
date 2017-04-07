import { Component, AfterViewInit } from '@angular/core';
import { BucketlistItem } from '../bucketlist-item';
import { BucketlistService } from '../bucketlist.service';
declare var $;
declare var Materialize;

@Component({
  selector: 'bucketlist-form',
  templateUrl: './bucketlist-form.component.html',
  styleUrls: ['./bucketlist-form.component.scss']
})
export class BucketlistFormComponent implements AfterViewInit {

  model = BucketlistItem.create();
  chipsPlaceholder = {
    placeholder: '+Tag',
    secondaryPlaceholder: 'Tags',
  };
  animatePanel: boolean;

  constructor(private bucketlistService: BucketlistService) {
  }

  onDrop(data) {
  }

  tagAdded(tagInfo) {
    this.model.tags.push(tagInfo.tag);
  }

  tagDeleted(tagInfo) {
    this.model.tags = this.model.tags.filter((t) => t !== tagInfo.tag);
  }

  saveItem () {
    this.bucketlistService.saveBucketlistItem(this.model)
      .then(() => {
        Materialize.toast('Item saved', 4000);
        this.closeForm();
      })
      .catch(() => {
        Materialize.toast('Error while saving', 4000);
      });
  }

  closeForm() {
    $('#modal').modal('close');
  }

  reset() {
    this.model = BucketlistItem.create();
    $('label').removeClass('active');
  }

  change(prop, newValue) {
    if (newValue === null) {
      return;
    }
    this.model[prop] = newValue;
  }

  ngAfterViewInit() {
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
    $('select#room').on('change', (e) => {
      const val = $(e.target).val();
      this.change('room', val);
    });
    $('input.select-dropdown').focus(() => $('#modal').addClass('showOverflow'));
    $('input').not('.select-dropdown').focus(() => $('#modal').removeClass('showOverflow'));
  }



}
