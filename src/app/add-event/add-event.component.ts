import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventService } from '../services/EventService';
import { CustomEvent } from '../../types/Event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
  eventName: String = '';
  eventDescription: String = '';
  eventDate: String;

  selectedEvent: CustomEvent | null = null;

  events: CustomEvent[] = [];

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private eventService: EventService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.queryParams as { date: Date };
    const formattedDate = state?.date
      ? this.datePipe.transform(state.date, 'short')
      : null;
    if (eventService.getDateDayValue() !== state.date) {
      eventService.setDay({ day: state.date, events: [] });
    }
    this.eventDate = formattedDate ?? '';
  }

  ngOnInit(): void {
    this.eventService.selectedEvent$.subscribe((event) => {
      this.selectedEvent = event;
      if (event) {
        this.eventDate = event?.eventDate ? event.eventDate : '';
        this.eventName = event.eventName;
        this.eventDescription = event.eventDescription;
      }
    });

    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });

    this.eventName = '';
    this.eventDescription = '';
    this.eventService.getDay().subscribe((day) => {
      const formattedDate = this.datePipe.transform(day?.day, 'short');
      this.eventDate = formattedDate ?? '';
    });
  }

  saveEvent() {
    const base = new Date();
    const splited = this.eventDate.toString().split(':');
    const formattedDate = this.datePipe.transform(
      new Date(
        base.getFullYear(),
        base.getMonth(),
        base.getDate(),
        Number(splited[0]),
        Number(splited[1])
      ),
      'short'
    );

    const evt = {
      id: this.selectedEvent?.id ?? this.events.length,
      eventName: this.eventName,
      eventDescription: this.eventDescription,
      eventDate: formattedDate,
    };

    const index = this.events.findIndex(
      (event) => event.id === this.selectedEvent?.id
    );
    //edit
    if (this.selectedEvent?.id && index !== -1) {
      this.events[index] = evt;
    } else {
      //save
      this.events.push(evt);
    }

    this.eventService.setEvents(this.events);
  }

  newEvent() {
    this.eventDate = '';
    this.eventDescription = '';
    this.eventName = '';
    this.selectedEvent = null;
  }
}
