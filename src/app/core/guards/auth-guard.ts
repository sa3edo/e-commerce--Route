import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { STORED_KEYS } from '../constant/storedKeys';
export const authGuard: CanActivateFn = (route, state) => {
  // inject services
  const platform=inject(PLATFORM_ID)
  const router=inject(Router)
  //variables
  if(isPlatformBrowser(platform)) {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token) as {id : string};
      localStorage.setItem(STORED_KEYS.userId, userData.id);
      return true
    }else{
      return router.parseUrl('/signin')
    }
  }
  return true

};
