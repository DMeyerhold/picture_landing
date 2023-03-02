import modals from './modules/modals';
import bindModalState from './modules/bindModalState';
import slider from './modules/slider';
import forms from './modules/forms';
import checkTextInputs from './modules/checkTextInputs';
import mask from './modules/mask';
import formCards from './modules/formCards';
import calc from './modules/calc';
import filter from './modules/filter';
import hover from './modules/hover';
import accordion from './modules/accordion';
import burgerMenu from './modules/burgerMenu';
import scrolling from './modules/scrolling';
import drop from './modules/drop';
import dragAndDrop from './modules/dragAndDrop';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let calcModalState = bindModalState('.calc .calc-form');

    calc('.calc .calc-form', calcModalState);
    modals();
    forms(calcModalState);

    slider({
        sliderSelector: '.main-slider',
        itemSelector: '.main-slider-item',
        dir: 'column',
        btns: false
    });

    slider({
        sliderSelector: '.feedback-slider',
        itemSelector: '.feedback-slider-item',
        revert: true
    });
   
    checkTextInputs("input[name='name']");
    checkTextInputs("[name='message']");
    mask("[name='phone']");
    formCards('#styles .container .row', '.button-styles');
    filter();
    hover();
    accordion("#accordion .accordion-heading", "#accordion .accordion-block", "ui-accordion-header-active");
    burgerMenu('header .burger', 'header .burger-menu');
    scrolling('.pageup');
    scrolling('header a[href]', false);
    dragAndDrop();
});