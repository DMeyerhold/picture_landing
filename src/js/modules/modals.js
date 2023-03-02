import checkTextInputs from "./checkTextInputs";

function closeModal(modal, ...fixItemPosition) {
    modal.style.display = "none";
    modal.classList.remove('faded');
    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`;

    if (fixItemPosition) {
        fixItemPosition.forEach(item => {
            item.style.marginRight = `0px`;
        });
    }

    const inputs = modal.querySelectorAll('input');
}

function openModal(modal) {
    modal.style.display = "block";
    modal.classList.add('faded');
    document.body.style.overflow = "hidden";
}

const modals = (state) => {   
    let modalClicked = false;

    function bindModal({
        triggerSelector,
        modalSelector,
        closeSelector,
        removeTrigger
    }) {
        const triggers = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = modal.querySelector(closeSelector),
              windows = document.body.querySelectorAll('[data-modal]'),
              scroll = window.innerWidth - document.body.clientWidth,
              gift = document.querySelector('.fixed-gift');
        
        triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {e.preventDefault();}  

                if (removeTrigger) {
                    item.remove();
                }

                // added new atribute to make modal unclickable
                if (!item.hasAttribute('disable')) {    
                    modalClicked = true;

                    windows.forEach(item => {
                        closeModal(item);
                        item.classList.add('animated', 'fadeIn');
                    });

                    document.body.style.marginRight = `${scroll}px`;
                    gift.style.marginRight = `${scroll + 1}px`;
                    openModal(modal);
                }
            }); 
        });

        modal.addEventListener('click', (e) => {
            if (e.target && e.target.matches(closeSelector)) {
                closeModal(modal, gift);
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { 
                closeModal(modal, gift);
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.code === "Escape" && modal.style.display === "block") {
                closeModal(modal, gift);
            }
        });
    }

    function showIfScrolled (triggerSelector, modalSelector) {
        window.addEventListener('scroll', function checkScroll() {
            let scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

            if (!modalClicked && (scrollHeight <=
            document.documentElement.clientHeight + (Math.floor(document.documentElement.scrollTop) + 2))) {
                document.querySelector(triggerSelector).click();

                window.removeEventListener('scroll', checkScroll);
            }
        });
    }

    function setModalTimer(modalSelector, delay) {
        const modalTimerId = setTimeout(() => {
            const scroll = window.innerWidth - document.body.clientWidth;
            const gift = document.querySelector('.fixed-gift');

            let windowShown;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    windowShown = true;
                } 
            });

            if (!windowShown) {
                document.body.style.marginRight = `${scroll}px`;      
                openModal(document.querySelector(modalSelector), modalTimerId);  
            }

            if (!windowShown && gift) {
                gift.style.marginRight = `${scroll + 1}px`;
            }
        }, delay);
        return modalTimerId;
    }

    // const modalTimer = setModalTimer('.popup-consultation', 5000);

    bindModal({
        triggerSelector: '.button-design',
        modalSelector: '.popup-design',
        closeSelector: '.popup-close'
    });
    bindModal({
        triggerSelector: '.button-consultation',
        modalSelector: '.popup-consultation',
        closeSelector: '.popup-close'
    });     
    bindModal({
        triggerSelector: '.fixed-gift',
        modalSelector: '.popup-gift',
        closeSelector: '.popup-close',
        removeTrigger: true
    });

    showIfScrolled('.fixed-gift', '.popup-gift');
};

export default modals;
export {closeModal, openModal};
