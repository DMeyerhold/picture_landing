'use strict';

const slider = ({sliderSelector, itemSelector, dir = 'row', btns = true, revert = false}) => {
    const slider = document.querySelector(sliderSelector);
    const slides = document.querySelectorAll(itemSelector);
    const wrapper = document.createElement('div');
    const styles =  window.getComputedStyle(slider.parentNode);

    let margin;
    let marginDirection;
    let totalDimensionValue;
    let currentDimensionValue = 0;
    let paused;

    // img sizes fix

    slides.forEach(slide => {
        slide.style.overflow = 'hidden';
        slide.querySelectorAll('img').forEach(img => {
            img.style.width = '99%';
        });
    });

    function buildSlider() {
        slider.innerHTML = '';
        slider.prepend(wrapper);
        slider.style.cssText = `
            overflow: hidden;
            position: relative;
            height: fit-content;
        `;

        wrapper.classList.add('main-wrapper');
        wrapper.style.cssText = `
            display: flex;
            justify-content: flex-start;
            transition: all 1s ease 0s;
            flex-direction: ${dir};
            height: fit-content;
        `;

        setDimension();

        if (btns && window.innerWidth > 767) {
            setBtns();
        }
    }

    function setBtns() {
        if (slider.querySelectorAll('.main-slider-btn').length < 2) {
            slider.querySelectorAll('.main-slider-btn').forEach(item => {
                item.remove();
            });

            const srcsArray = ['assets/img/left-arr.png', 'assets/img/right-arr.png'];
            const btnsArray =  ['main-prev-btn', 'main-next-btn'];

            for (let i = 0; i < 2; i++) {
                const btn = document.createElement('button');
                const btnImg = document.createElement('img');
    
                btn.classList.add(btnsArray[i]);
                btn.classList.add(`main-slider-btn`);
                btn.append(btnImg);    
                
                btnImg.src = srcsArray[i]; 
                slider.append(btn);
            }    
        }

        const prev = document.querySelector(`${sliderSelector} .main-prev-btn`);
        const next = document.querySelector(`${sliderSelector} .main-next-btn`);

        prev.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            pushSlide(-margin);
        });

        next.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            pushSlide(margin);
        });
    }

    function pushSlide(margin) {
        
        currentDimensionValue = currentDimensionValue + margin;

        if (currentDimensionValue < 0) {
            currentDimensionValue = Math.abs(margin) * (slides.length - 1);
        } 

        if (currentDimensionValue >= totalDimensionValue) {
            currentDimensionValue = 0;
        } 

        wrapper.style[marginDirection] = `-${currentDimensionValue}px`;
    }

    function removeChars(str) {
        return +str.replace(/\D/g, '');
    }

    function setSliderTimer() {
        paused = setInterval(()=> {
            pushSlide(margin);
        }, 5000);
    }

    function setDimension(windowWidth) {
        let width;
        let height;          

        wrapper.innerHTML = '';

        slides.forEach(slide => {
            wrapper.append(slide);
            slide.style.height = "fit-content";

            if (slide.parentNode.childElementCount === 1) {
                width = Math.round(+window.getComputedStyle(slides[0].closest("[data-slider]")).width.slice(0, -2));
                height = Math.round(+window.getComputedStyle(slides[0]).height.slice(0, -2));        
            }

            slide.style.width = width + "px";   
        });

        slider.style.height = height + 'px';
        currentDimensionValue = 0;

        if (windowWidth < 768 && revert) {
            slider.style.height = "fit-content";   
            slider.querySelectorAll('.main-slider-btn').forEach(btn => {
                btn.remove();
            });
        } else if (btns) {
            setBtns();
        }

        if (dir !== 'row' ) {
            margin = height;
            marginDirection = 'marginTop';
            totalDimensionValue = margin * slides.length;
            wrapper.style.height = totalDimensionValue + 'px';
            wrapper.style.marginTop = 0;
        } else {
            margin = width;
            marginDirection = 'marginLeft';
            totalDimensionValue = margin * slides.length;
            wrapper.style.width = totalDimensionValue + 'px';
            wrapper.style.marginLeft = 0;
        }
    }

    window.addEventListener('resize', () => {
        setDimension(window.innerWidth);
    });

    slider.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    slider.addEventListener('mouseleave', () => {
        setSliderTimer();
    });

    buildSlider();
    setSliderTimer();
};

export default slider;