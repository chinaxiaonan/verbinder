import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarklistComponent } from './bookmarklist.component';

describe('BookmarklistComponent', () => {
  let component: BookmarklistComponent;
  let fixture: ComponentFixture<BookmarklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
