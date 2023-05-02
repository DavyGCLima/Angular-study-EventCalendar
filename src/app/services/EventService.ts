import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomEvent } from '../../types/Event';
import { Day } from 'src/types/Day';

const mockedEvents = [
  {
    id: 1,
    eventName: 'Evt 1',
    eventDescription: 'a short-term event',
    eventDate: new Date(2023, 4, 1, 10, 0).toDateString(),
  },
  {
    id: 2,
    eventName: 'Evt 2',
    eventDescription: 'a long, long term event',
    eventDate: new Date(2023, 4, 1, 12, 0).toDateString(),
  },
  {
    id: 3,
    eventName: 'Evt 3',
    eventDescription: 'Some other random event',
    eventDate: new Date(2023, 4, 1, 14, 0).toDateString(),
  },
];
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private selectedEventSubject = new BehaviorSubject<CustomEvent | null>(null);
  selectedEvent$ = this.selectedEventSubject.asObservable();

  private events = new BehaviorSubject<CustomEvent[]>([]);

  private selectedDay = new BehaviorSubject<Day | null>(null);

  constructor() {
    this.selectedDay.next({
      day: new Date(),
      events: mockedEvents,
    });
    this.events.next(this.selectedDay.value?.events ?? mockedEvents);
  }

  selectEvent(event: CustomEvent) {
    this.selectedEventSubject.next(event);
  }

  deleteEvent(event: CustomEvent) {
    this.selectedDay.next({
      day: this.selectedDay.value?.day ?? new Date(),
      events:
        this.selectedDay.value?.events.filter((evt) => evt.id !== event.id) ??
        [],
    });
  }

  setEvents(events: CustomEvent[]) {
    this.selectedDay.next({
      day: this.selectedDay.value?.day ?? new Date(),
      events,
    });
  }

  getEvents() {
    return this.events.asObservable();
  }

  setDateDay(date: Date) {
    this.selectedDay.next({
      day: date,
      events: this.selectedDay.getValue()?.events ?? [],
    });
  }

  setDay(day: Day) {
    console.log('setDay day', day);
    this.selectedDay.next(day);
    this.events.next(day.events ?? mockedEvents);
  }

  getDay() {
    return this.selectedDay.asObservable();
  }

  getDateDayValue() {
    return this.selectedDay.value?.day ?? new Date();
  }
}
