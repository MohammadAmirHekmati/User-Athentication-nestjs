import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  limit:number
  @ApiProperty()
  page:number
}