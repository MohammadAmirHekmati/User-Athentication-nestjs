import { RoleEnum } from '../role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES='roles'
export const RoleGuardDecorator=(...roles:RoleEnum[])=>SetMetadata(ROLES,roles)