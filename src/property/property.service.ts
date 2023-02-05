import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IFilterParams } from 'src/utils/types';
import * as properties from './imoveis.json';

@Injectable()
export class PropertyService {
  findAll() {
    return properties;
  }

  findOne(id: number) {
    const property = properties.find((p) => p.id === id);
    if (!property) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return property;
  }

  filter({ propertyType, swlat, swlng, nelat, nelng }: IFilterParams) {
    const isNotValidPropertyTypeParam =
      !Array.isArray(propertyType) || propertyType.length === 0;

    const newPropertiesFiltered = properties.filter((p) => {
      const isPropertyInsideMap =
        p.lat > (swlat ? +swlat : -Infinity) &&
        p.lat < (nelat ? +nelat : Infinity) &&
        p.lng > (swlng ? +swlng : -Infinity) &&
        p.lng < (nelng ? +nelng : Infinity);

      if (isPropertyInsideMap) {
        if (isNotValidPropertyTypeParam || propertyType.includes(p.type))
          return p;
      }
    });

    return newPropertiesFiltered;
  }
}
