(function () {
    function copyCat(elem1, elem2, elem3) {
        params = new URLSearchParams(location.search);

        let elem1Input = document.querySelector(elem1);
        let elem2Input = document.querySelector(elem2);
        let elem3Input = params.get(elem3);

        window.addEventListener('load', () => {
            if (elem3Input) {
                elem1Input.value = elem3Input;
                elem2Input.value = elem3Input;
            } else {
                elem1Input.value = elem2Input.value;
            }
            calculate();
        });

        elem2Input.addEventListener('input', () => {
            elem1Input.value = elem2Input.value;
            params.set(elem3, elem2Input.value);
            window.history.replaceState({}, '', `${location.pathname}?${params}`);
            calculate();
        });
        
        elem1Input.addEventListener('input', () => {
            elem2Input.value = elem1Input.value;
            params.set(elem3, elem1Input.value);
            window.history.replaceState({}, '', `${location.pathname}?${params}`);        
            calculate();
        });

        let stepDown = document.querySelector(`${elem1}-slider-step-down`);
        let stepUp = document.querySelector(`${elem1}-slider-step-up`);

        stepDown.addEventListener('click', () => {
            elem2Input.stepDown();
            elem1Input.value = elem2Input.value;
            params.set(elem3, elem2Input.value);
            window.history.replaceState({}, '', `${location.pathname}?${params}`);
            calculate();
        });

        stepUp.addEventListener('click', () => {
            elem2Input.stepUp();
            elem1Input.value = elem2Input.value;
            params.set(elem3, elem2Input.value);
            window.history.replaceState({}, '', `${location.pathname}?${params}`);        
            calculate();
        });
    }

    function thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }

    function calculate() {
        const monthlyCustomers = parseInt(document.querySelector('.monthly-customers-input').value);
        const monthlySubscriptionPrice = parseInt(document.querySelector('.monthly-subscription-price-input').value);
        const months = parseInt(document.querySelector('.months-input').value);
        const results = document.querySelector('.annual-turnover-results-text');
        let monthlyRevenue = [];
        let mrr = monthlyCustomers * monthlySubscriptionPrice;
        let arr = mrr * 12;
        
        for (let i = 0; i < months; i++) {
            if (i > 0) {
                monthlyRevenue.push(mrr + monthlyRevenue[i-1]);
            } else {
                monthlyRevenue.push(mrr);
            }
        }
        
        annualTurnover = monthlyRevenue.reduce((a, b) => a + b, 0);


        results.innerHTML = `
            <h3 class="text-2xl mb-5">Results</h3>
            <p>If you acquire <strong class="text-2xl">${monthlyCustomers}</strong> customers per month paying <strong class="text-2xl">£${monthlySubscriptionPrice}</strong> each - your revenue over ${months} months will be <strong class="text-2xl">£${thousands_separators(annualTurnover.toFixed(2))}</strong></p>
            <div class="flex flex-col md:flex-row">
                <div class="annual-turnover-result-row mt-10 border-2 border-gray-900 p-2 md:mr-2 shadow">
                    <div class="text-lg"><strong>MRR</strong> <br/><span class="text-sm">(Monthly Recurring Revenue)</span></div>
                    <div class="text-lg font-bold">£${thousands_separators(mrr.toFixed(2))}</div>
                </div>
                <div class="annual-turnover-result-row mt-10 border-2 border-gray-900 p-2 md:ml-2 shadow">
                    <div class="text-lg"><strong>ARR</strong> <br/><span class="text-sm">(Annual Recurring Revenue)</span></div>
                    <div class="text-lg font-bold">£${thousands_separators(arr.toFixed(2))}</div>
                </div>
            </div>
            <div class="annual-turnover-result-row mt-10 border-2 border-gray-900 p-2 shadow">
            <div class="text-lg"><strong>Turnover</strong> <br/><span class="text-sm">(${months} Months Revenue)</span></div>
                <div class="text-lg font-bold">£${thousands_separators(annualTurnover.toFixed(2))}</div>
            </div>        
        `;
    }

    let printButton = document.querySelector('.annual-turnover-print');

    printButton.addEventListener('click', () => {
        window.print();
    });

    let emailButton = document.querySelector('.annual-turnover-email');

    emailButton.addEventListener('click', () => {
        let emailLink = encodeURIComponent(window.location.href);
        let subject = document.title;

        var mailToLink = `mailto:?subject=${subject}&body=${emailLink}`;
        window.location.href = mailToLink;
    });

    let shareButton = document.querySelector('.annual-turnover-share');

    shareButton.addEventListener('click', () => {
        let tempInput = document.createElement('input');
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert(`Copied the shareable link \n${tempInput.value} \nto your clipboard.`);
        document.body.removeChild(tempInput);
    });

    copyCat('.monthly-customers-input', '.monthly-customers-input-slider-range', 'customers');
    copyCat('.monthly-subscription-price-input', '.monthly-subscription-price-input-slider-range', 'price');
    copyCat('.months-input', '.months-input-slider-range', 'months');
    calculate();
})();