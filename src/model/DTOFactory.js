import { ProdDTO } from './ProdDTO.js';
import { SaleDTO } from './SaleDTO.js';

export class DTOFactory {
    static createProdDTO() {
        return new ProdDTO();
    }

    static createSaleDTO() {
        return new SaleDTO();
    }
}