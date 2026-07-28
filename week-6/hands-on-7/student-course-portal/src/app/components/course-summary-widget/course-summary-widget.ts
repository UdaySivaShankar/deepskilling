import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidgetComponent implements OnInit {
  totalCourses = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.totalCourses = this.courseService.getCourses().length;
  }
}
