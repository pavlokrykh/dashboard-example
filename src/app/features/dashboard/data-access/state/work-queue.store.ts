import { IWorkQueueItem } from '@core/models/work-queue-item.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface IWorkQueueStore {
  isLoading: boolean;
  tasks: IWorkQueueItem[];
}

const initState: IWorkQueueStore = {
  isLoading: false,
  tasks: [],
};

export const WorkQueueStore = signalStore(
  { providedIn: 'root' },
  withState(initState),
  withMethods((store) => ({
    setLoading(isLoading: boolean): void {
      patchState(store, { isLoading });
    },
    updateTasks(tasks: IWorkQueueItem[]): void {
      patchState(store, { tasks });
    },
  })),
);
