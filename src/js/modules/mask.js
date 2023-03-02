const mask = (selector) => {
    const input = document.querySelectorAll(selector);

    function setCursorPosition(elem, pos) {
        elem.focus();

        setTimeout(() => {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveStart(pos);
                range.moveEnd(pos);
                range.select();            
            }
        }); 
    }

    function createMask(event) {
        const matrix = '+7 (___) ___ __ __';
        const def = matrix.replace(/\D/g, '');
        let val = this.value.replace(/\D/g, '');
        let i = 0;

        if (val.length < def.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        }); 

        if (this.value.charAt(1) !== '7') {
            this.value = '+7';
        }

        if (event.type === 'blur') {
            if (val.length < 2) {
                this.value = '';
            } 
        } 
        
        if (this.selectionStart < 2) {
            setCursorPosition(this, this.value.length);
        }
    } 

    input.forEach(item => {
        item.addEventListener('input', createMask);
        item.addEventListener('blur', createMask);
        item.addEventListener('click', createMask);
    });
};

export default mask;