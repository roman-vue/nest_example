import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExampleDto {
    @ApiProperty({type:String, default: 'hey listen!'})
    @IsString()
    example:string
}

export class UpdateExampleDto extends PartialType(CreateExampleDto){}