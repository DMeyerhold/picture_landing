const accordion = (triggerSelector, contentSelector, activeClass) => {
    const trigger = document.querySelectorAll(triggerSelector);

    // // automated version 
    function collapse(item) {
        trigger.forEach(btn => {
            if (item.classList.contains(activeClass) && item === btn) {
                item.nextElementSibling.style.maxHeight = "fit-content";
            } else {
                btn.nextElementSibling.style.maxHeight = 0;
                btn.classList.remove(activeClass);
                btn.nextElementSibling.classList.remove("content-active");
            }
        });
    }

    trigger.forEach(item => {
        item.nextElementSibling.classList.add("accordion-custom");
        item.addEventListener('click', function () {            
            this.classList.toggle(activeClass);            
            this.nextElementSibling.classList.toggle("content-active");

            collapse(item);
        });
    });

    // // unautomized realization 
    // function animateTabs(item, toggle = true) {
    //     if (toggle) {
    //         item.classList.toggle(activeClass);
    //         item.nextElementSibling.classList.toggle("fadeInUp");
    //         item.nextElementSibling.classList.toggle("fadeOutDown");
    //     }

    //     if (item.classList.contains(activeClass)) {
    //         item.nextElementSibling.style.display = "block";
    //     } else {
    //         setTimeout(() => {
    //             item.nextElementSibling.style.display = "none";
    //         }, 250);
    //     }
    // }

    // trigger.forEach(item => {
    //     animateTabs(item, false);

    //     item.nextElementSibling.classList.add("animated", "fadeOutDown");
    //     item.addEventListener('click', function () {
            
    //         animateTabs(this);
    //     });
    // });
};

export default accordion;