const checkTextInputs = (selector) => {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        // input.addEventListener('keypress', (e) => {
        //     if (!/[а-яё 0-9]/igm.test(e.key)) {
        //         e.preventDefault();
        //     }
        // });

        input.addEventListener('input', () => {
            input.value = input.value.replace(/\d/g, '') !== '' ? input.value.replace(/[^а-яё 0-9]/igm, '') : '';
        });
    });
};

export default checkTextInputs;