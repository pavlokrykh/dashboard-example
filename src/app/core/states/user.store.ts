import { IUser } from '@core/models/user.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface IUserStore {
  user: IUser | null;
}

const initState: IUserStore = {
  user: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initState),
  withMethods((store) => ({
    updateUser(user: IUser | null): void {
      patchState(store, { user });
    },
  })),
);
