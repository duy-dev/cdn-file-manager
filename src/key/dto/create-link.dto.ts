import { IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  IP: string;

  @IsNotEmpty()
  MAC: string;
}
