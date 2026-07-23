import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app and load tasks on init', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('https://localhost:5001/api/tasks');
    req.flush([]);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the TaskFlow title', () => {
    fixture.detectChanges();
    httpMock.expectOne('https://localhost:5001/api/tasks').flush([]);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TaskFlow');
  });

  it('should not call the API when submitting a blank task title', () => {
    fixture.detectChanges();
    httpMock.expectOne('https://localhost:5001/api/tasks').flush([]);

    const component = fixture.componentInstance;
    component.newTitle = '   ';
    component.createTask();

    httpMock.expectNone('https://localhost:5001/api/tasks');
  });
});
