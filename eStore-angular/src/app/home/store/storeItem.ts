// Third party import
import { BehaviorSubject, Observable } from 'rxjs';

export class StoreItem<T> {
  private readonly _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
  }

  protected get value$(): Observable<T> {
    return this._state$.asObservable();
  }

  protected get value(): T {
    return this._state$.value;
  }

  protected setValue(newValue: T): void {
    this._state$.next(newValue);
  }
}
