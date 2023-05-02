import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventService } from '../services/EventService';
import { CustomEvent } from 'src/types/Event';

@Component({
  selector: 'app-event-footer',
  templateUrl: './event-footer.component.html',
  styleUrls: ['./event-footer.component.css'],
})
export class EventFooterComponent {
  @Input() events: CustomEvent[] = [];

  @Output() eventUpdated = new EventEmitter<CustomEvent>();

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }

  editSelectedEvent(event: CustomEvent) {
    if (event) {
      this.eventUpdated.emit(event);
      this.eventService.selectEvent(event);
    }
  }

  deleteEvent(evt: CustomEvent) {
    if (evt) {
      this.eventService.deleteEvent(evt);
    }
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    this.eventService.setEvents(this.events);
  }
}
