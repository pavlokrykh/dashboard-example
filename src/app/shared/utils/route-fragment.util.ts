import { inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

export interface RouteFragmentOptions<T> {
  defaultValue: T;
  fragmentMapper?: (fragment: string | null) => T;
}

export function useRouteFragment<T extends string>(options: RouteFragmentOptions<T>) {
  const router = inject(Router);
  const route = inject(ActivatedRoute);

  const $fragment = signal<T>(options.defaultValue);
  // Listen to fragment changes
  route.fragment.pipe(takeUntilDestroyed()).subscribe((fragment) => {
    const mappedValue = options.fragmentMapper
      ? options.fragmentMapper(fragment)
      : (fragment as T) || options.defaultValue;
    $fragment.set(mappedValue);
  });

  // Set default fragment if none exists
  if (!route.snapshot.fragment) {
    router.navigate([], { fragment: options.defaultValue, replaceUrl: true });
  }

  const setFragment = (value: T) => {
    $fragment.set(value);
    router.navigate([], { fragment: value });
  };

  return {
    $fragment,
    setFragment,
  };
}
