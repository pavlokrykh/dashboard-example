import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs/operators';

export const delayInterceptor: HttpInterceptorFn = (req, next) => {
  // Add a 500ms delay to all requests to mock real request latency
  return next(req).pipe(delay(500));
};
