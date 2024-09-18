function calculate() {
    const startingCapital = parseFloat(document.getElementById('startingCapital').value);
    const endingTarget = parseFloat(document.getElementById('endingTarget').value);
    const days = parseInt(document.getElementById('days').value);
    const lotSize = parseFloat(document.getElementById('lotSize').value);
    const layers = parseInt(document.getElementById('layers').value);
    const setupPerDay = parseInt(document.getElementById('setupPerDay').value);
    const targetPips = 20;
    const realLotSize = lotSize * 10;

    if (isNaN(startingCapital) || isNaN(endingTarget) || isNaN(days) || isNaN(lotSize) || isNaN(layers) || isNaN(setupPerDay) || days <= 0 || lotSize <= 0 || layers <= 0 || setupPerDay <= 0) {
        alert('Please enter valid inputs.');
        return;
    }

    let currentCapital = startingCapital;
    let resultTable = `<table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400"><thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"><tr><th class="scope="col" class="px-6 py-3">Day</th><th class="scope="col" class="px-6 py-3">Starting Capital</th><th class="scope="col" class="px-6 py-3">Lot Size</th><th class="scope="col" class="px-6 py-3">Target Pips</th><th class="scope="col" class="px-6 py-3">Layers</th><th class="scope="col" class="px-6 py-3">Setup Per Day</th><th class="scope="col" class="px-6 py-3">Profit</th><th class="scope="col" class="px-6 py-3">Total</th></tr></thead><tbody>`;

    for (let i = 1; i <= days; i++) {
        const profit = (realLotSize * targetPips * layers * setupPerDay).toFixed(2);
        const total = (currentCapital + parseFloat(profit)).toFixed(2);
        const highlightClass = total >= endingTarget ? 'highlight' : '';
        resultTable += `<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${highlightClass}"><td class="px-6 py-4">${i}</td><td class="px-6 py-4">${currentCapital.toFixed(2)}</td><td class="px-6 py-4">${lotSize}</td><td class="px-6 py-4">${targetPips}</td><td class="px-6 py-4">${layers}</td><td class="px-6 py-4">${setupPerDay}</td><td class="px-6 py-4">${profit}</td><td class="px-6 py-4">${total}</td></tr>`;
        currentCapital += parseFloat(profit);
    }

    resultTable += `</tbody></table>`;
    document.getElementById('result').innerHTML = resultTable;
}

function shareResults() {
    const result = document.getElementById('result').innerHTML;
    if (result) {
        navigator.share({ text: result });
    } else {
        alert('Please calculate the result first.');
    }
}

function downloadAsImage() {
    //html2canvas(document.querySelector('.result')).then(canvas => {
    html2canvas(document.getElementById('result').innerHTM).then(canvas => {
        const link = document.createElement('a');
        link.download = 'compounding-target.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

function downloadAsPDF() {
    const result = document.getElementById('result').innerHTML;
    if (result) {
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.fromHTML(result, 10, 10);
        doc.save('compounding-target.pdf');
    } else {
        alert('Please calculate the result first.');
    }
}
