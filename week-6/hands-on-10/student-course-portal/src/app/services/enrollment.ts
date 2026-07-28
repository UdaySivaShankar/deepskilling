import { Injectable } from '@angular/core';
import { CourseService } from './course';
import { Course } from '../models/course.model';
import { Observable, forkJoin, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  // Service-to-service injection
  constructor(private courseService: CourseService) { }

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    if (this.enrolledCourseIds.length === 0) {
      return of([]);
    }
    const observables = this.enrolledCourseIds.map(id => this.courseService.getCourseById(id));
    return forkJoin(observables).pipe(
      map(courses => courses.filter((c): c is Course => c !== undefined))
    );
  }
}
