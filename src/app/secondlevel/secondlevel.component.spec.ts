import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondlevelComponent } from './secondlevel.component';

describe('SecondlevelComponent', () => {
  let component: SecondlevelComponent;
  let fixture: ComponentFixture<SecondlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondlevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
