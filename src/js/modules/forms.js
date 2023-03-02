import { closeModal } from "./modals";
import { postData } from "../services/requests";

const forms = (state) => {
    const form = document.querySelectorAll('form');
    const upload = document.querySelectorAll('[name="upload"]');

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Мы с вами свяжемся",
        error: "Что-то пошло не так",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    form.forEach(item => bindPostData(item));

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form),
                  {selectValues} = state;

            if (form.classList.contains('calc-form')) {
                let calcDisplay = form.querySelector('.calc-price');

                for (const prop in selectValues) {
                    formData.append(prop, selectValues[prop]);
                    delete selectValues[prop];    
                }

                if (state.total > 0) {
                    formData.append('Price', state.total);
                }

                state.clear();
                calcDisplay.innerText = 'Для расчета нужно выбрать размер картины и материал картины';      
            }
            
            const statusMessage = document.createElement('div');
            let statusImg = document.createElement('img');
            let statusText = document.createElement('div');

            form.parentNode.append(statusMessage);
            form.classList.add('animated', 'fadeOutUp');
            form.style.display = 'none';

            statusMessage.classList.add('status-message');
            statusMessage.style.textAlign = 'center';   
            statusMessage.append(statusImg);
            statusMessage.append(statusText);

            statusImg.classList.add('animated', 'fadeInUp');
            statusImg.src = message.spinner;
            statusImg.style.width = '50px';
            statusImg.style.height = '50px';   

            statusText.innerText = message.loading;

            let api;

            form.closest('.popup-design') || form.classList.contains('calc-form') ? api = path.designer : api = path.question;
           
            postData(api, formData)
                .then(data => {
                    console.log(data);
                    statusImg.src = message.ok;
                    statusText.innerText = message.success;
                })
                .catch(e => {
                    statusImg.src = message.fail;
                    statusText.innerText = message.error;
                })
                .finally(() => {
                    clearInputs(form);

                    setTimeout(() => {
                        statusMessage.remove();
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                        form.style.display = 'block';

                        if (form.closest('[data-modal]')) {
                            closeModal(form.closest('[data-modal]'));
                        }
                    }, 3000);
                });
        });
    }

    const clearInputs = (form) => {
        const inputs = Array.from(form.querySelectorAll('input'));
        inputs.push(...form.querySelectorAll('textarea'));
        inputs.push(...form.querySelectorAll('select'));
    
        inputs.forEach(item => {
            if (item.nodeName === "INPUT" || item.nodeName === "TEXTAREA") {
                item.value = '';
            }
    
            if (item.name === "upload") {
                item.previousElementSibling.innerText = "Файл не выбран";
            }
    
            if (item.nodeName === "SELECT") {
                item.selectedIndex = 0;
            }
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            const fileName = item.files[0].name.split('.');

            let dots = fileName[0].length > 7 ? '...' : '.';

            let name = fileName[0].substr(0, 7) + dots + fileName[1];

            item.previousElementSibling.innerText = name;
        });
    });
};

export default forms;