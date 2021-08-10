import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumPageComponent } from './dum-page.component';

describe('DumPageComponent', () => {
  let component: DumPageComponent;
  let fixture: ComponentFixture<DumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
