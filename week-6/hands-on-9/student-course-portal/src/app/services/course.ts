import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';

// providedIn: 'root' makes the service a singleton
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private coursesUrl = 'assets/courses.json';

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl);
  }

  // Notice: For a real API we would fetch by ID. Here we just fetch all and map.
  getCourseById(id: number): Observable<Course | undefined> {
    return this.getCourses().pipe(
      map((courses: Course[]) => courses.find(c => c.id === id))
    );
  }

  addCourse(course: Course): void {
    // In a real app, this would be an HTTP POST
    console.log('Course added (simulated):', course);
  }
}
