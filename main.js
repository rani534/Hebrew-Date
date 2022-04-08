'use strict';

const elInput = document.querySelector('input');
const elHebrewDate = document.querySelector('.hebrew-date');
const elValidity = document.querySelector('.validation');

function init() {
    elHebrewDate.textContent = '~~~';
}

// bring down the focus() //
elInput.addEventListener('keyup', (ev) => {
    if (ev.code === 'Enter') elInput.blur();
});

elInput.addEventListener('input', getInfo);

async function getInfo({ target }) {
    const isValide = checkValidation(target);
    if (!isValide) return;
    const dateObj = getDateObj(target.value);
    try {
        const hebrewDate = await getHebrewDate(dateObj);
        elHebrewDate.textContent = hebrewDate;
        elValidity.textContent = '';
    } catch (err) {
        console.log(err);
    }
}

function checkValidation(target) {
    if (target.validity.valid && target.value) return true;
    elHebrewDate.textContent = '~~~';
    elValidity.textContent = '*התאריך שהזנת שגוי, או שהוא לא בין השנים 1900-2100.';
    return false;
}

async function getHebrewDate(dateObj) {
    const { year, month, day } = dateObj;
    try {
        let res = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`);
        res = await res.json();
        return res.hebrew;
    } catch (err) {
        console.log(err);
    }
}

function getDateObj(valStr) {
    const arrOfDate = valStr.split('-');
    const [year, month, day] = arrOfDate;
    return { year, month, day };
}
