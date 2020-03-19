import { Component, OnInit } from '@angular/core';

import { Group } from '../group';
import { HeroService } from '../group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class HeroesComponent implements OnInit {
  groups: Group[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(groups => this.groups = groups);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Group)
      .subscribe(group => {
        this.groups.push(group);
      });
  }

  delete(group: Group): void {
    this.groups = this.groups.filter(h => h !== group);
    this.heroService.deleteHero(group).subscribe();
  }

}
