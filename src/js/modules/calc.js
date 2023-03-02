import { getResource } from "../services/requests";

const calc = (parrentSelector, state) => {
    const imgInput = document.querySelector(`${parrentSelector} input[type="file"]`),
          imgRequired = false,
          size = document.querySelector('#size'),
          material = document.querySelector('#material'),
          options = document.querySelector('#options'),
          promocode = document.querySelector(`${parrentSelector} .promocode`),
          promo = 'IWANTPOPART',
          display = document.querySelector(`${parrentSelector} .calc-price`),
          submitBtn = document.querySelector(`${parrentSelector} .button-order`);

    getResource('http://localhost:3000/prices')
    .then(data => {
        data.forEach(obj => {
            document.querySelector(obj.id).forEach((option, i) => {
                option.value = obj.values[i];
            });
        });
    })
    .catch(e => {
        const message = document.createElement('div');
        message.style.cssText = `
            text-align: center;
            color: red;
            margin-top: 15px;
        `;
        message.innerText = 'Не удалось загрузить цены, попробуйте перезагрузить';
        display.innerText = 'Для расчета нужно выбрать размер картины и материал картины';

        submitBtn.insertAdjacentElement('beforebegin', message);
    });

    function changeState(elem, prop) {
        elem.addEventListener('input', () => {
            switch(elem.nodeName) {
                case'SELECT':
                    state[elem.id] = +elem.value;
                    if (prop && elem.value > 0) {
                        state.selectValues[prop] = elem.options[elem.selectedIndex].textContent;
                    } else {
                        delete state.selectValues[prop];
                    }
                    break;
                case'INPUT':
                    if (elem.type === "text") {
                        state.promocode = elem.value;
                    } else if (elem.files.length > 0) {
                        state.imgUploaded = true;
                    }
                    break;
            }

            state.sumTotal();

            if (state.total > 0) {
                display.textContent = state.total;                
            } else {
                display.textContent = 'Пожалуйста выберите размер и материал картины';                
            }
        });
    }
 
    changeState(imgInput);
    changeState(size, 'canvasSize');
    changeState(material, 'canvasMaterial');
    changeState(options, 'extra');
    changeState(promocode);

    // let sum = 0;

    // function calc() {
    //     sum = (+size.value) + (+material.value) + (+options.value);

    //     if (size.value == 0 || material.value == 0) {
    //         display.textContent = "Пожалуйста выберите размер и материал картины";
    //     } else if (promocode.value === promo) {
    //         display.textContent = Math.round(sum * 0.7);
    //     } else {
    //         display.textContent = sum;
    //     }
    // }

    // size.addEventListener('change', calc);
    // material.addEventListener('change', calc);
    // options.addEventListener('change', calc);
    // promocode.addEventListener('input', calc);
};

export default calc;
