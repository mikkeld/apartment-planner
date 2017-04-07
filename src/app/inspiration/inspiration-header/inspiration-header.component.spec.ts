import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationHeaderComponent } from './inspiration-header.component';

describe('InspirationHeaderComponent', () => {
  let component: InspirationHeaderComponent;
  let fixture: ComponentFixture<InspirationHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspirationHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
