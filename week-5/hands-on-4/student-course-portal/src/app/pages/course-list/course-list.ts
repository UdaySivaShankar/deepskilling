import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  isLoading = true;
  selectedCourseId: number | null = null;
  
  courses = [
    { id: 1, name: 'Angular Basics', code: 'CS101', credits: 3, gradeStatus: 'passed' },
    { id: 2, name: 'Advanced React', code: 'CS102', credits: 4, gradeStatus: 'failed' },
    { id: 3, name: 'Data Structures', code: 'CS103', credits: 4, gradeStatus: 'pending' },
    { id: 4, name: 'Web Security', code: 'CS104', credits: 2, gradeStatus: 'passed' },
    { id: 5, name: 'Machine Learning', code: 'CS105', credits: 5, gradeStatus: 'pending' }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  // trackBy improves performance by only re-rendering the specific items in the list that changed.
  // Without it, Angular re-renders every item if the array reference changes.
  trackByCourseId(index: number, course: any): number {
    return course.id;
  }
}
