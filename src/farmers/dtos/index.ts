import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class IFarmerDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  document: string;
}
