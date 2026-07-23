import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {
  courses = [
    { id: 1, name: 'Angular Basics', code: 'ANG101', credits: 3 },
    { id: 2, name: 'Advanced React', code: 'REA201', credits: 4 },
    { id: 3, name: 'NodeJS Fundamentals', code: 'NOD101', credits: 3 },
    { id: 4, name: 'Spring Boot', code: 'SPR201', credits: 4 },
    { id: 5, name: 'Microservices', code: 'MIC301', credits: 5 }
  ];

  selectedCourseId: number | null = null;

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
