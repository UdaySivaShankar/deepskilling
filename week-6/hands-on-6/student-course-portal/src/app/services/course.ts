import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

// providedIn: 'root' makes the service a singleton
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'CS101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Advanced React', code: 'CS102', credits: 4, gradeStatus: 'failed' },
    { id: 3, name: 'Data Structures', code: 'CS103', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Web Security', code: 'CS104', credits: 2, gradeStatus: 'passed' },
    { id: 5, name: 'Machine Learning', code: 'CS105', credits: 5, gradeStatus: 'pending' }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
