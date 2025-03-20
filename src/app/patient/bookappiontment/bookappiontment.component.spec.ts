import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookappiontmentComponent } from './bookappiontment.component';

describe('BookappiontmentComponent', () => {
  let component: BookappiontmentComponent;
  let fixture: ComponentFixture<BookappiontmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookappiontmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookappiontmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
