import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientComponent } from './ambient.component';

describe('AmbientComponent', () => {
  let component: AmbientComponent;
  let fixture: ComponentFixture<AmbientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
