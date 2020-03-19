import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Group } from './group';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/groups';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET groups from the server */
  getHeroes (): Observable<Group[]> {
    return this.http.get<Group[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched groups')),
        catchError(this.handleError<Group[]>('getHeroes', []))
      );
  }

  /** GET group by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Group> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Group[]>(url)
      .pipe(
        map(groups => groups[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} group id=${id}`);
        }),
        catchError(this.handleError<Group>(`getHero id=${id}`))
      );
  }

  /** GET group by id. Will 404 if id not found */
  getHero(id: number): Observable<Group> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      tap(_ => this.log(`fetched group id=${id}`)),
      catchError(this.handleError<Group>(`getHero id=${id}`))
    );
  }

  /* GET groups whose name contains search term */
  searchHeroes(term: string): Observable<Group[]> {
    if (!term.trim()) {
      // if not search term, return empty group array.
      return of([]);
    }
    return this.http.get<Group[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found groups matching "${term}"`) :
         this.log(`no groups matching "${term}"`)),
      catchError(this.handleError<Group[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new group to the server */
  addHero (group: Group): Observable<Group> {
    return this.http.post<Group>(this.heroesUrl, group, this.httpOptions).pipe(
      tap((newHero: Group) => this.log(`added group w/ id=${newHero.id}`)),
      catchError(this.handleError<Group>('addHero'))
    );
  }

  /** DELETE: delete the group from the server */
  deleteHero (group: Group | number): Observable<Group> {
    const id = typeof group === 'number' ? group : group.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Group>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted group id=${id}`)),
      catchError(this.handleError<Group>('deleteHero'))
    );
  }

  /** PUT: update the group on the server */
  updateHero (group: Group): Observable<any> {
    return this.http.put(this.heroesUrl, group, this.httpOptions).pipe(
      tap(_ => this.log(`updated group id=${group.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
