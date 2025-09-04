import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  // inject services
  const platform=inject(PLATFORM_ID)
  const router=inject(Router)
  //variables
  if(isPlatformBrowser(platform)) {
    const token = localStorage.getItem("token");
    if (token) {
      return router.parseUrl('/home')
    }else{
      return true
    }
  }
  return router.parseUrl('/home')

};
