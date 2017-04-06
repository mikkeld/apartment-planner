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
export class BucketlistFormComponent {

  private model = BucketlistItem.create();
  private chipsPlaceholder = {
    placeholder: '+Tag',
    secondaryPlaceholder: 'Tags',
  };

  constructor(private bucketlistService: BucketlistService) { }

  private onDrop(data) {
  }

  private tagAdded(tagInfo) {
    this.model.tags.push(tagInfo.tag);
  }

  private tagDeleted(tagInfo) {
    this.model.tags = this.model.tags.filter((t) => t !== tagInfo.tag);
  }

  saveItem () {
    console.log('save button clicked');
    this.bucketlistService.saveBucketlistItem(this.model)
      .then(res => {
        Materialize.toast('Item saved', 4000);
        this.closeForm();
      })
      .catch(error => {
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
    if (newValue === null) return;
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
      var val = $(e.target).val();
      this.change('room', val);
    });
    $('input.select-dropdown').focus(() => $('#modal').addClass('showOverflow'));
    $('input').not('.select-dropdown').focus(() => $('#modal').removeClass('showOverflow'));
  }



}
