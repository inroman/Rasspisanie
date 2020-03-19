import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Group } from './group';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const groups = [
      { id: 1, name: 'Пиб-1301-01' },
      { id: 2, name: 'Пиб-2301-01' },
      { id: 3, name: 'Пиб-3301-01' },
      { id: 4, name: 'Пиб-4301-01' },
      { id: 5, name: 'Fasasga-1243' },
      { id: 5, name: 'Fasasga-2243' }
    ];
    return {groups};
  }

  // Overrides the genId method to ensure that a group always has an id.
  // If the groups array is empty,
  // the method below returns the initial number (11).
  // if the groups array is not empty, the method below returns the highest
  // group id + 1.
  genId(groups: Group[]): number {
    return groups.length > 0 ? Math.max(...groups.map(group => group.id)) + 1 : 11;
  }
}
