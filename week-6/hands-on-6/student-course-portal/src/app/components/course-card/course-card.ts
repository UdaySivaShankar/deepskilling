import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course: any;
  @Output() enrollRequested = new EventEmitter<number>();
  
  isExpanded = false;
  isEnrolled = false;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course'] && this.course) {
      this.isEnrolled = this.enrollmentService.isEnrolled(this.course.id);
    }
  }

  onEnroll() {
    if (!this.isEnrolled) {
      this.enrollmentService.enroll(this.course.id);
      this.isEnrolled = true;
      this.enrollRequested.emit(this.course.id);
    }
  }

  onUnenroll() {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
      this.isEnrolled = false;
    }
  }

  toggleDetails() {
    this.isExpanded = !this.isExpanded;
  }

  // ngClass dynamic styling getter
  // Getters keep templates clean and keep logic in TypeScript
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course?.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  getBorderStyle() {
    switch (this.course?.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      case 'pending': return 'grey';
      default: return 'transparent';
    }
  }
}
