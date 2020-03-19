import { Component, OnInit } from '@angular/core';
import { Group} from '../group';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  //@Input() group: Group;
  constructor() { }

  ngOnInit(): void {
  }

}
