import { CanActivate, ExecutionContext } from '@nestjs/common';
import axios from 'axios';
import { ICheckIpResponseApi } from '../interfaces/check-ip-api-response.interface';
import { bannedCountries } from '../enums/country-banned.enums';

export class IpControllGuard implements CanActivate{
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request=context.switchToHttp().getRequest()
    const userIp=request.connection.remoteAddress
    const ip:string='69.174.101.97'
    const result=await axios.get(`https://api.iplocation.net/?ip=${ip}`)
    const result_data:ICheckIpResponseApi=result.data
    const userCountryName=result_data.country_name.toLowerCase()


  const active=bannedCountries.includes(userCountryName)
    if (active==true)
      return false

    return true
  }

}