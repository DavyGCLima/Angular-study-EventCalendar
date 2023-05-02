import { CustomEvent } from './Event';

export interface Day {
  day: Date;
  events: CustomEvent[];
}
