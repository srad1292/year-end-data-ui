

// Gender 
// Fiction v Nonfiction
// Physical vs Digital vs Audio
// Books by week


const endDates = [
    '2024-01-06', '2024-01-13', '2024-01-20', '2024-01-27', '2024-02-03', '2024-02-10', '2024-02-17', '2024-02-24', 
    '2024-03-02', '2024-03-09', '2024-03-16', '2024-03-23', '2024-03-30', '2024-04-06', '2024-04-13', '2024-04-20', '2024-04-27', 
    '2024-05-04', '2024-05-11', '2024-05-18', '2024-05-25', '2024-06-01', '2024-06-08', '2024-06-15', '2024-06-22', '2024-06-29', 
    '2024-07-06', '2024-07-13', '2024-07-20', '2024-07-27', '2024-08-03', '2024-08-10', '2024-08-17', '2024-08-24', '2024-08-31', 
    '2024-09-07', '2024-09-14', '2024-09-21', '2024-09-28', '2024-10-05', '2024-10-12', '2024-10-19', '2024-10-26', 
    '2024-11-02', '2024-11-09', '2024-11-16', '2024-11-23', '2024-11-30', '2024-12-07', '2024-12-14', '2024-12-21', '2024-12-28', '2025-12-31'
];

const readDates = [
    2, 4, 6, 6, 8, 8, 10, 10, 
    11, 13, 14, 15, 17, 17, 18, 18, 19, 
    21, 22, 22, 23, 23, 24, 25, 25, 27, 
    28, 28, 29, 30, 31, 31, 33, 34, 34, 
    35, 35, 37, 39, 40, 40, 41, 43, 
    43, 45, 46, 47, 47, 49, 51, 52, 53, 53
];



// Determine colors when real data comes in
buildGenderChart();
buildFictionChart();
buildEditionChart();
buildBooksOverTimeChart();

function buildGenderChart() {
    const genderCtx = document.getElementById('genderChart');
    let categoryTotalData = [
        { label: 'Male', value: 30},
        { label: 'Female', value: 23},
    ];

    let sortedData = categoryTotalData.sort((a,b) => b.value-a.value);
    // @ts-ignore
    new Chart(genderCtx, {
        type: 'bar',
        data: {
            labels: sortedData.map(cat => cat.label),
            datasets: [
                {
                    data: sortedData.map(cat => cat.value)
                }
            ],
        },
        options: {
            // responsive: true
            indexAxis: 'x',
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Read'
                    },
                    max: 55,
                    min: 0,
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            }
        }
    });
}


function buildFictionChart() {
    const fictionCtx = document.getElementById('fictionChart');
    let categoryTotalData = [
        { label: 'Fiction', value: 49},
        { label: 'Nonfiction', value: 4},
    ];

    let sortedData = categoryTotalData.sort((a,b) => b.value-a.value);
    // @ts-ignore
    new Chart(fictionCtx, {
        type: 'bar',
        data: {
            labels: sortedData.map(cat => cat.label),
            datasets: [
                {
                    data: sortedData.map(cat => cat.value)
                }
            ],
        },
        options: {
            // responsive: true
            indexAxis: 'x',
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Read'
                    },
                    max: 55,
                    min: 0,
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            }
        }
    });
}

function buildEditionChart() {
    const editionCtx = document.getElementById('editionChart');
    let categoryTotalData = [
        { label: 'Physical', value: 32},
        { label: 'Digital', value: 11},
        { label: 'Audio', value: 10},
    ];

    let sortedData = categoryTotalData.sort((a,b) => b.value-a.value);
    // @ts-ignore
    new Chart(editionCtx, {
        type: 'bar',
        data: {
            labels: sortedData.map(cat => cat.label),
            datasets: [
                {
                    data: sortedData.map(cat => cat.value)
                }
            ],
        },
        options: {
            // responsive: true
            indexAxis: 'x',
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Read'
                    },
                    max: 55,
                    min: 0,
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            }
        }
    });
}

function buildBooksOverTimeChart() {
    const booksOverTimeCtx = document.getElementById('booksOverTime');
    // @ts-ignore
    new Chart(booksOverTimeCtx, {
        type: 'line',
        data: {
            labels: endDates,
            datasets: [
                {
                    label: 'Read',
                    data: readDates,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Read'
                    }
                }
            },
            plugins: {
                title: {
                    display: false,
                    text: "Date"
                }
            }
            
        }
    });
}
