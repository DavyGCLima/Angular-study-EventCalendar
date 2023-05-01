import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  constructor(private router: Router) {}

  selectDate(selectedDate: Date) {
    if (selectedDate) {
      this.router.navigate(['/add-event'], {
        queryParams: { date: selectedDate.toISOString() },
      });
    }
  }
}
