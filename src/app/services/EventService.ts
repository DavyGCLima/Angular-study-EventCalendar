import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomEvent } from '../../types/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private selectedEventSubject = new BehaviorSubject<CustomEvent | null>(null);
  selectedEvent$ = this.selectedEventSubject.asObservable();

  private events = new BehaviorSubject<CustomEvent[]>([]);

  constructor() {
    this.events.next([
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
    ]);
  }

  selectEvent(event: CustomEvent) {
    this.selectedEventSubject.next(event);
  }

  deleteEvent(event: CustomEvent) {
    this.events.next(
      this.events.getValue().filter((evt) => evt.id !== event.id)
    );
  }

  setEvents(events: CustomEvent[]) {
    this.events.next(events);
  }

  getEvents() {
    return this.events.asObservable();
  }
}
