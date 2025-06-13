import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IUser } from '@core/models/user.model';
import { LoginService } from '@core/services/login.service';

export const loginResolver: ResolveFn<IUser> = () => inject(LoginService).login();
