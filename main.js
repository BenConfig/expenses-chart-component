"use strict";

fetch("./data.json")
    .then(resp => resp.json())
    .then(data => {
        const BAR_CHART = document.querySelector('.spending__bar-chart');

        const highestSpend = Math.max(...data.map(day => day.amount));
        const maxBarHeight = 9.375;

        for (const day of data) {
            const DAY = document.createElement('p');
            DAY.classList.add('spending__day');
            DAY.setAttribute('tabindex', 0)

            const DAY_BAR = document.createElement('span');
            DAY_BAR.classList.add('spending__day-bar');
            DAY_BAR.setAttribute('aria-hidden', true);

            const percentOfHighestSpend = (day.amount/highestSpend) * 100;
            const barHeight = (maxBarHeight/100) * percentOfHighestSpend;

            DAY_BAR.style.height = barHeight + 'rem';
            if (barHeight === maxBarHeight) DAY_BAR.style.backgroundColor = 'hsl(186, 34%, 60%)';

            const DAY_NAME = document.createElement('span');
            DAY_NAME.classList.add('spending__day-name');
            DAY_NAME.innerText = day.day;

            const DAY_AMOUNT = document.createElement('span');
            DAY_AMOUNT.classList.add('spending__day-amount');
            DAY_AMOUNT.setAttribute('aria-live', 'polite');
            DAY_AMOUNT.innerText = '$' + day.amount;

            DAY.append(DAY_BAR, DAY_NAME, DAY_AMOUNT)

            BAR_CHART.appendChild(DAY)
        }
    });