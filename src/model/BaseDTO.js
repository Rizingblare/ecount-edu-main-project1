export class BaseDTO {
    constructor() {
        if (new.target === BaseDTO) {
            throw new Error('BaseDTO 인스턴스를 직접 생성할 수 없습니다.');
        }
    }

    trim() {
        const requiredFields = Object.keys(this);

        for (let field of requiredFields) {
            if (typeof this[field] === 'string') {
                this[field] = this[field].trim();
            }
        }
    }

    validate() {
        let isValid = true;
        const requiredFields = Object.keys(this);

        for (let field of requiredFields) {
            if (!this[field]) {
                alert(`${field}를 입력해주세요.`);
                isValid = false;
            }
        }

        return isValid;
    }
}