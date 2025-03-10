// Third party import
import { inject } from '@angular/core';
import { map } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
// Local import
import { UserService } from './user.service';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(UserService).isUserAuthenticated$.pipe(
    map((isAuthenticated) =>
      isAuthenticated
        ? true
        : createUrlTreeFromSnapshot(next, ['/', 'home', 'login']),
    ),
  );
};
