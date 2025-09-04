import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // inject services
  const platform=inject(PLATFORM_ID)
  const router=inject(Router)
  //variables
  if(isPlatformBrowser(platform)) {
    const token = localStorage.getItem("token");
    if (token) {
      return true
    }else{
      return router.parseUrl('/signin')
    }
  }
  return router.parseUrl('/signin')

};
