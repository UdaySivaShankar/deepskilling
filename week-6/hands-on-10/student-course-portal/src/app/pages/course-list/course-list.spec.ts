import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectAllCourses, selectCoursesLoading } from '../../store/course.selectors';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const initialState = {
    courses: {
      courses: [],
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({}) }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    
    // Override selectors if needed
    store.overrideSelector(selectAllCourses, [{ id: 1, name: 'Angular Basics', code: 'CS101', credits: 3, gradeStatus: 'passed' }]);
    store.overrideSelector(selectCoursesLoading, false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display courses from store', async () => {
    const courses = await firstValueFrom(component.courses$);
    expect(courses.length).toBe(1);
    expect(courses[0].name).toBe('Angular Basics');
  });
});
