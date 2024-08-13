export class ProdDTO {
    constructor(id = '', prodCode = '', prodName = '') {
        this.id = id;
        this.prodCode = prodCode;
        this.prodName = prodName;
    }

    static get Builder() {
        class Builder {
            constructor(prodDTO) {
                this.prodDTO = prodDTO;
            }

            setId(id) {
                this.prodDTO.id = id;
                return this;
            }

            setProdCode(prodCode) {
                this.prodDTO.prodCode = prodCode;
                return this;
            }

            setProdName(prodName) {
                this.prodDTO.prodName = prodName;
                return this;
            }

            build() {
                return this.prodDTO;
            }
        }
        return Builder;
    }
}