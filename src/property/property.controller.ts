import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { IFilterParams } from 'src/utils/types';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll(@Res() res: Response): any {
    const properties = this.propertyService.findAll();
    res.status(HttpStatus.OK).json(properties);
  }

  @Get('/filter')
  filter(@Query() query: IFilterParams, @Res() res: Response): any {
    const properties = this.propertyService.filter(query);
    res.status(HttpStatus.OK).json({ properties });
  }

  @Get('/:id')
  findOne(@Param() params, @Res() res: Response): any {
    const property = this.propertyService.findOne(+params.id);
    res.status(HttpStatus.OK).json(property);
  }
}
