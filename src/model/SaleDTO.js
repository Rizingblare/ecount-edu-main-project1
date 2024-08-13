export class SaleDTO {
    constructor(id = '', date_dt = '', date_no = '', prodCode = '', prodName = '', quantity = 0, price = 0.0, remarks = '') {
        this.id = id;
        this.date_dt = date_dt;
        this.date_no = date_no;
        this.prodCode = prodCode;
        this.prodName = prodName;
        this.quantity = quantity;
        this.price = price;
        this.remarks = remarks;
    }

    builder() {
        return new SaleDTO.Builder(this);
    }

    static get Builder() {
        class Builder {
            constructor(saleDTO = new SaleDTO()) {
                this.saleDTO = saleDTO;
            }

            setId(value) {
                this.saleDTO.id = value;
                return this;
            }

            setDateDt(value) {
                this.saleDTO.date_dt = value;
                return this;
            }

            setDateNo(value) {
                this.saleDTO.date_no = value;
                return this;
            }

            setProdCode(value) {
                this.saleDTO.prodCode = value;
                return this;
            }

            setProdName(value) {
                this.saleDTO.prodName = value;
                return this;
            }

            setQuantity(value) {
                this.saleDTO.quantity = value;
                return this;
            }

            setPrice(value) {
                this.saleDTO.price = value;
                return this;
            }

            setRemarks(value) {
                this.saleDTO.remarks = value;
                return this;
            }

            build() {
                return this.saleDTO;
            }
        }
        return Builder;
    }
}