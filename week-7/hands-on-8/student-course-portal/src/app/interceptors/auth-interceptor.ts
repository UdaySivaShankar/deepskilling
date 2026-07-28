import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: 'Bearer fake-jwt-token'
    }
  });

  console.log('HTTP Interceptor: Added Authorization header');
  return next(clonedRequest);
};
