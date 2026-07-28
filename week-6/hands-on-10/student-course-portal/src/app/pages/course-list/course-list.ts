import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import * as CourseActions from '../../store/course.actions';
import { selectAllCourses, selectCoursesLoading } from '../../store/course.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
  }

  ngOnInit() {
    this.store.dispatch(CourseActions.loadCourses());
  }

  onEnroll(courseId: number) {
    console.log(`Enrolled in course ID: ${courseId}`);
  }

  // trackBy improves performance by only re-rendering the specific items in the list that changed.
  // Without it, Angular re-renders every item if the array reference changes.
  trackByCourseId(index: number, course: any): number {
    return course.id;
  }
}
