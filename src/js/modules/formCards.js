import { getResource } from "../services/requests";

// const cardsUpload = (cardSelector, btnSelector) => {

//     const cards = document.querySelectorAll(cardSelector),
//           btn = document.querySelector(btnSelector);

//     function upload() {
//         cards.forEach(card => {
//             card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
//             card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
//         });    
            
//         btn.remove();
//     }

//     btn.addEventListener('click', upload);
// };

const formCards = (parrentSelector, trigger) => {
    const btn = document.querySelector(trigger);

    const makeCard = ({src, title, link}) => {
        const parrent = document.querySelector(parrentSelector),
              wrapper = document.createElement('div');
            //   card = document.createElement('div');

        wrapper.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        wrapper.innerHTML = `
            <div class="styles-block">
                <img src="${src}" alt="">
                <h4>${title}</h4>
                <a href="${link}">Подробнее</a>
            </div>
        `;

        parrent.append(wrapper);
    };

    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles')
        .then(data => {
            data.forEach(item => {
                makeCard(item);
            });

            this.remove();
        })
        .catch(e => {
            console.log(e);
            const alertMessage = document.createElement('div');
            alertMessage.style.cssText = `
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                bottom: 155px;
                color: red;
                font-size: 20px;
            `;

            alertMessage.textContent = "Что-то пошло не так... Попробуйте ещё раз";
            btn.parentNode.append(alertMessage);
            setTimeout(() => {
                alertMessage.remove();
            }, 2500);
        });
    });
};

export default formCards;