const bindModalState = (parrentSelector) => {
    const parrent = document.querySelector(parrentSelector);
    const imgRequired = false;
    const promo = "IWANTPOPART";

    const state = {
        size: 0,
        material: 0,
        options: 0,
        total: 0,
        selectValues: {},
        sumTotal() {
            this.total = this.size !== 0 && this.material !== 0 ? this.size + this.material + this.options : 0;

            if (this.promocode.replace(/\s/g, '') === promo) {
                this.total = Math.round(this.total * 0.7);
            }

            if (imgRequired && this.imgUploaded === false) {
                this.total = 0;
            }

            return this.total;
        },

        clear: function() {
            for (let prop in this) {
                this[prop] = 0;
            }
        }
    };  

    Object.defineProperties(state, {
        imgUploaded: {
            value: false,
            writable: true,
            configurable: true
        },
        promocode: {
            value: '',
            writable: true,
            configurable: true
        },
        sumTotal: {
            enumerable: false
        },
        clear: {
            enumerable: false
        },
        selectValues: {
            enumerable: false
        }
    });

    return state;
};

export default bindModalState;