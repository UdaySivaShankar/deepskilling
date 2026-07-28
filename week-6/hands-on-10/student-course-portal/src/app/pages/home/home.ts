import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from '../course-list/course-list';
import { CourseService } from '../../services/course';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, CourseListComponent, CourseSummaryWidgetComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesCount = 0;

  constructor(private courseService: CourseService) {}

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  // difference between [property] and [(ngModel)]:
  // [property] is one-way data binding from component to DOM.
  // [(ngModel)] is two-way data binding, keeping component and DOM in sync (DOM <-> component).

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.coursesCount = courses.length;
      console.log('HomeComponent initialised — courses loaded');
    });
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }
}
