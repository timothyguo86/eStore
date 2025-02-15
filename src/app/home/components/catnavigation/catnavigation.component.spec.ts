import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatNavigationComponent } from './catNavigation.component';

describe('CatNavigationComponent', () => {
  let component: CatNavigationComponent;
  let fixture: ComponentFixture<CatNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
