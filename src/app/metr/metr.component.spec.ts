import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrComponent } from './metr.component';

describe('MetrComponent', () => {
  let component: MetrComponent;
  let fixture: ComponentFixture<MetrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
