import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { HeroService } from '../group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  groups: Group[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(groups => this.groups = groups.slice(1, 5));
  }
}
