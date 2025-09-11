import { Pipe, PipeTransform } from '@angular/core';
import { IProductsData } from '../../features/products/interfaces/IGetAllProducts';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(array: IProductsData[], searchTerm:string): IProductsData[] {
    return array.filter((product) => 
       product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
