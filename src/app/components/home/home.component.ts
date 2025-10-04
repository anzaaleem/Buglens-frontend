import { Component, signal } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';
import { GreetingComponent } from '../greeting/greeting.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
homeMessage=signal('Hello, world!');

keyUpHandler(event:KeyboardEvent){
  console.log(`user pressed ${event.key} key in the input`);
}

}
