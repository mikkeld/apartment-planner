import { Directive, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[droppable]'
})
export class DroppableDirective implements OnInit {

  @Output() dropped: EventEmitter<any> = new EventEmitter();

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
      let el = this._elementRef.nativeElement;

      // Add a style to indicate that this element is a drop target
      el.addEventListener('dragenter', (e) => {
        el.classList.add('over');
      });

      // Remove the style
      el.addEventListener('dragleave', (e) => {
        el.classList.remove('over');
      });

      el.addEventListener('dragover', (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
      });

      el.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        el.classList.remove('over');

        var data = e.dataTransfer.files.length > 0
          ? e.dataTransfer.files[0] 
          : e.dataTransfer.getData('text/html').match(/src\s*=\s*"(.+?)"/)[1];

        this.dropped.emit(data);
        return false;
      })
    }  
}
