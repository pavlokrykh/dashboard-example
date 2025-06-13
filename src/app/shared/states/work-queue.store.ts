import { computed } from '@angular/core';
import { IWorkQueueItem } from '@core/models/work-queue-item.model';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface IWorkQueueStore {
  isLoading: boolean;
  tasks: IWorkQueueItem[];
  searchValue: string;
}

const initState: IWorkQueueStore = {
  isLoading: false,
  searchValue: '',
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
    updateSearchValue(searchValue: string): void {
      patchState(store, { searchValue });
    },
  })),
  withComputed((store) => ({
    filteredTasks: computed(() => {
      const searchValue = store.searchValue();
      const tasks = store.tasks();
      const filteredTasks = tasks.filter((task) =>
        task.originator.toLocaleLowerCase().includes(searchValue.toLowerCase()),
      );
      return searchValue ? filteredTasks : tasks;
    }),
  })),
);
