import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KgraphComponent } from './kgraph.component';

describe('KgraphComponent', () => {
  let component: KgraphComponent;
  let fixture: ComponentFixture<KgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
