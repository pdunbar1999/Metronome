import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBeatsComponent } from './saved-beats.component';

describe('SavedBeatsComponent', () => {
  let component: SavedBeatsComponent;
  let fixture: ComponentFixture<SavedBeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedBeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedBeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
