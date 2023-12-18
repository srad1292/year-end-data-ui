
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let data = getData(); 



// buildWeightChart();
// Determine colors when real data comes in
buildNumberAnalytics();
buildTimeSpentChart();
buildCategoryTotalChart();
buildMonthlyStackedChart();
buildHappinessCharts();


function buildNumberAnalytics() {
    document.getElementById("days-completed").innerText = `${data.didHourCount}`;
    // document.getElementById("days-failed").innerText = `${data.didNotDoHourCount}`;
    document.getElementById("more-than-hour").innerText = `${data.didMoreThanHourCount}`;
    document.getElementById("percent-more-than-hour").innerText = `${data.percentMoreThanHour}%`;
    document.getElementById("total-time").innerText = `${getHoursAndMinutesFromTime(data.totalTime)}`;
    document.getElementById("longest-daily").innerText = `${getHoursAndMinutesFromTime(data.longestDailyTime)}`;
    document.getElementById("longest-monthly").innerText = `${getHoursAndMinutesFromTime(data.longestMonthlyTime)}`;
    document.getElementById("average-daily-time").innerText = `${getHoursAndMinutesFromTime(data.averageDailyTime)}`;
    document.getElementById("average-monthly-time").innerText = `${getHoursAndMinutesFromTime(data.averageMonthlyTime)}`;
}

//2498.50

function averageTimeToDisplay(time) {
    let seconds = getSecondsFromTime(time);
    let hoursMins = getHoursAndMinutesFromTime(time);
    return `${hoursMins} ${seconds}s`;
}

function getSecondsFromTime(time) {
    return Math.round(time%1*60);
}

function getHoursAndMinutesFromTime(time) {
    let hours = Math.floor(time/60);
    let minutes = Math.floor(time)%60;
    return `${hours}hr ${minutes}min`;
}



function buildTimeSpentChart() {
    const timeSpentCtx = document.getElementById('timeSpentChart');
    // @ts-ignore
    new Chart(timeSpentCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Research/Studying',
                    data: data.timeSpent.researchAndStudying,
                    fill: false
                },
                {
                    label: 'Planning',
                    data: data.timeSpent.projectPlanning,
                    fill: false
                },
                {
                    label: 'Writing',
                    data: data.timeSpent.writing,
                    fill: false
                },
                {
                    label: 'Game Dev',
                    data: data.timeSpent.gameDev,
                    fill: false
                },
                {
                    label: 'General Programming',
                    data: data.timeSpent.generalProgramming,
                    fill: false
                },
                {
                    label: 'VFX/Art',
                    data: data.timeSpent.vfx,
                    fill: false
                },
                {
                    label: 'SFX',
                    data: data.timeSpent.sfx,
                    fill: false
                },
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Minutes'
                    }
                }
            },
            plugins: {
                title: {
                    display: false,
                    text: "Time For Category By Month"
                }
            }
            
        }
    });
}

// Todo: Add in stacked bar graph for time spent on category by month
function buildMonthlyStackedChart() {
    const monthlyStackedChartCtx = document.getElementById('monthlyStackedChart');
    const datasets = [
        { label: 'Planning', data: data.timeSpent.projectPlanning},
        { label: 'Game Dev', data: data.timeSpent.gameDev},
        { label: 'General Programming', data: data.timeSpent.generalProgramming},
        { label: 'VFX', data: data.timeSpent.vfx},
        { label: 'SFX', data: data.timeSpent.sfx},
        { label: 'Writing', data: data.timeSpent.writing},
        { label: 'Research/Studying', data: data.timeSpent.researchAndStudying},
    ];

    console.log("Stacked data");
    console.log(datasets);

    new Chart(monthlyStackedChartCtx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets.map(dataset => {
                return {
                    label: dataset.label,
                    data: dataset.data,
                };
            }),
        },
        options: {
            // responsive: true
            indexAxis: 'x',
            scales: {
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Minutes'
                    }
                },
                x: {
                    stacked: true,
                }
            },
            plugins: {
                legend: {
                    display: true,
                },
            }
        }
    });
}

function buildCategoryTotalChart() {
    const timeSpentCtx = document.getElementById('categoryTotalChart');
    let categoryTotalData = [
        { label: 'Planning', value: data.categoryTotals.projectPlanning},
        { label: 'Game Dev', value: data.categoryTotals.gameDev},
        { label: 'General Programming', value: data.categoryTotals.generalProgramming},
        { label: 'VFX', value: data.categoryTotals.vfx},
        { label: 'SFX', value: data.categoryTotals.sfx},
        { label: 'Writing', value: data.categoryTotals.writing},
        { label: 'Research/Studying', value: data.categoryTotals.researchAndStudying},
    ];

    let sortedData = categoryTotalData.sort((a,b) => b.value-a.value);
    // @ts-ignore
    new Chart(timeSpentCtx, {
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
                        text: 'Minutes'
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

function buildHappinessCharts() {
    months.forEach((month, index) => {
        if(index >= 0) {
            const happinessContext = document.getElementById(`${month}HappinessChart`);
            // @ts-ignore
            new Chart(happinessContext, {
                type: 'bar',
                data: {
                    labels: ['Awful', 'Bad', 'Neutral', 'Good', 'Great'],
                    datasets: [
                        {
                            data: [
                                data.happiness[index].one, data.happiness[index].two, data.happiness[index].three, 
                                data.happiness[index].four, data.happiness[index].five, 
                            ],
                            backgroundColor: [
                                'rgb(25, 25, 28)',
                                'rgb(212, 44, 6)',
                                'rgb(110, 109, 135)',
                                'rgb(20, 150, 20)',
                                'rgb(65, 250, 228)',
                            ],
                            hoverOffset: 2
                        }
                    ]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        title: {
                            display: true,
                            text: month
                        },
                        legend: {
                            display: false,
                        },
                    },
                }
            });
        }
    });
}

function buildWeightChart() {
    const weightCtx = document.getElementById('weightChart');
    // @ts-ignore
    new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: data.weights.map(record => record.date),
            datasets: [{
                label: 'Weight (lb)',
                data: data.weights.map(record => record.weight),
                fill: false
            }]
        },
        options: {
            responsive: true
        }
    });
}


function getData() {
    return {
        "unexpectedHourValueCount": 14,
        "didHourCount": 351,
        "didNotDoHourCount": 0,
        "didMoreThanHourCount": 205,
        "percentMoreThanHour": "58.40",
        "longestDailyTime": 244,
        "longestMonthlyTime": 3238,
        "totalTime": 30481,
        "averageDailyTime": "86.84",
        "averageMonthlyTime": "2540.08",
        "weights": [
            {
                "date": "1/1/23",
                "weight": "219.2"
            },
            {
                "date": "1/8/23",
                "weight": "217.2"
            },
            {
                "date": "1/15/23",
                "weight": "218.6"
            },
            {
                "date": "1/22/23",
                "weight": "217.8"
            },
            {
                "date": "1/29/23",
                "weight": "219"
            },
            {
                "date": "2/5/23",
                "weight": "220.4"
            },
            {
                "date": "2/12/23",
                "weight": "219.4"
            },
            {
                "date": "2/19/23",
                "weight": "220"
            },
            {
                "date": "2/26/23",
                "weight": "221.4"
            },
            {
                "date": "3/5/23",
                "weight": "219.2"
            },
            {
                "date": "3/12/23",
                "weight": "220"
            },
            {
                "date": "3/19/23",
                "weight": "219"
            },
            {
                "date": "3/26/23",
                "weight": "218.6"
            },
            {
                "date": "4/2/23",
                "weight": "218.6"
            },
            {
                "date": "4/9/23",
                "weight": "218"
            },
            {
                "date": "4/16/23",
                "weight": "218.4"
            },
            {
                "date": "4/23/23",
                "weight": "217.2"
            },
            {
                "date": "4/30/23",
                "weight": "217"
            },
            {
                "date": "5/7/23",
                "weight": "216.6"
            },
            {
                "date": "5/14/23",
                "weight": "217.4"
            },
            {
                "date": "5/21/23",
                "weight": "216.8"
            },
            {
                "date": "5/28/23",
                "weight": "217.2"
            },
            {
                "date": "6/4/23",
                "weight": "216.4"
            },
            {
                "date": "6/11/23",
                "weight": "217.4"
            },
            {
                "date": "6/18/23",
                "weight": "220.6"
            },
            {
                "date": "6/25/23",
                "weight": "218.2"
            },
            {
                "date": "7/2/23",
                "weight": "217.2"
            },
            {
                "date": "7/9/23",
                "weight": "217.4"
            },
            {
                "date": "7/16/23",
                "weight": "217.4"
            },
            {
                "date": "7/23/23",
                "weight": "218"
            },
            {
                "date": "7/30/23",
                "weight": "219.2"
            },
            {
                "date": "8/6/23",
                "weight": "218.4"
            },
            {
                "date": "8/13/23",
                "weight": "218.2"
            },
            {
                "date": "8/20/23",
                "weight": "219.6"
            },
            {
                "date": "8/27/23",
                "weight": "218.4"
            },
            {
                "date": "9/3/23",
                "weight": "221"
            },
            {
                "date": "9/10/23",
                "weight": "221"
            },
            {
                "date": "9/17/23",
                "weight": "221"
            },
            {
                "date": "9/24/23",
                "weight": "221"
            },
            {
                "date": "10/1/23",
                "weight": "221.4"
            },
            {
                "date": "10/8/23",
                "weight": "220.2"
            },
            {
                "date": "10/15/23",
                "weight": "221.4"
            },
            {
                "date": "10/22/23",
                "weight": "222.2"
            },
            {
                "date": "10/29/23",
                "weight": "221.4"
            },
            {
                "date": "11/5/23",
                "weight": "221.6"
            },
            {
                "date": "11/12/23",
                "weight": "221.6"
            },
            {
                "date": "11/19/23",
                "weight": "221.6"
            }
        ],
        "timeSpent": {
            "projectPlanning": [
                334,
                73,
                130,
                2,
                314,
                152,
                464,
                236,
                229,
                659,
                402,
                180
            ],
            "gameDev": [
                0,
                991,
                1441,
                1021,
                1093,
                374,
                330,
                0,
                359,
                38,
                0,
                0
            ],
            "generalProgramming": [
                1225,
                120,
                80,
                675,
                321,
                728,
                1090,
                1541,
                1669,
                178,
                1369,
                882
            ],
            "vfx": [
                400,
                537,
                330,
                309,
                104,
                0,
                80,
                0,
                0,
                0,
                0,
                0
            ],
            "sfx": [
                0,
                67,
                45,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "writing": [
                189,
                0,
                43,
                197,
                0,
                421,
                261,
                330,
                344,
                391,
                30,
                200
            ],
            "researchAndStudying": [
                891,
                506,
                1169,
                743,
                442,
                740,
                445,
                969,
                323,
                957,
                312,
                6
            ]
        },
        "categoryTotals": {
            "projectPlanning": 3175,
            "gameDev": 5647,
            "generalProgramming": 9878,
            "vfx": 1760,
            "sfx": 112,
            "writing": 2406,
            "researchAndStudying": 7503
        },
        "happiness": [
            {
                "one": 1,
                "two": 8,
                "three": 22,
                "four": 0,
                "five": 0
            },
            {
                "one": 0,
                "two": 8,
                "three": 20,
                "four": 0,
                "five": 0
            },
            {
                "one": 0,
                "two": 6,
                "three": 24,
                "four": 1,
                "five": 0
            },
            {
                "one": 0,
                "two": 4,
                "three": 25,
                "four": 1,
                "five": 0
            },
            {
                "one": 0,
                "two": 6,
                "three": 25,
                "four": 0,
                "five": 0
            },
            {
                "one": 2,
                "two": 10,
                "three": 18,
                "four": 0,
                "five": 0
            },
            {
                "one": 0,
                "two": 7,
                "three": 24,
                "four": 0,
                "five": 0
            },
            {
                "one": 1,
                "two": 8,
                "three": 22,
                "four": 0,
                "five": 0
            },
            {
                "one": 1,
                "two": 18,
                "three": 10,
                "four": 1,
                "five": 0
            },
            {
                "one": 0,
                "two": 3,
                "three": 28,
                "four": 0,
                "five": 0
            },
            {
                "one": 0,
                "two": 3,
                "three": 24,
                "four": 3,
                "five": 0
            },
            {
                "one": 0,
                "two": 4,
                "three": 12,
                "four": 1,
                "five": 0
            }
        ],
        "sortedDays": [
            {
                "date": "1/5/23",
                "time": 244
            },
            {
                "date": "4/1/23",
                "time": 222
            },
            {
                "date": "3/18/23",
                "time": 219
            },
            {
                "date": "9/4/23",
                "time": 208
            },
            {
                "date": "2/18/23",
                "time": 197
            },
            {
                "date": "9/8/23",
                "time": 196
            },
            {
                "date": "9/5/23",
                "time": 195
            },
            {
                "date": "9/6/23",
                "time": 190
            },
            {
                "date": "3/29/23",
                "time": 188
            },
            {
                "date": "1/13/23",
                "time": 186
            },
            {
                "date": "7/7/23",
                "time": 181
            },
            {
                "date": "4/12/23",
                "time": 175
            },
            {
                "date": "1/21/23",
                "time": 166
            },
            {
                "date": "4/6/23",
                "time": 166
            },
            {
                "date": "8/11/23",
                "time": 161
            },
            {
                "date": "7/4/23",
                "time": 160
            },
            {
                "date": "3/16/23",
                "time": 155
            },
            {
                "date": "7/18/23",
                "time": 154
            },
            {
                "date": "6/3/23",
                "time": 151
            },
            {
                "date": "4/18/23",
                "time": 150
            },
            {
                "date": "3/4/23",
                "time": 149
            },
            {
                "date": "2/21/23",
                "time": 147
            },
            {
                "date": "3/31/23",
                "time": 147
            },
            {
                "date": "8/23/23",
                "time": 147
            },
            {
                "date": "1/7/23",
                "time": 145
            },
            {
                "date": "6/4/23",
                "time": 145
            },
            {
                "date": "8/5/23",
                "time": 145
            },
            {
                "date": "3/10/23",
                "time": 143
            },
            {
                "date": "6/2/23",
                "time": 142
            },
            {
                "date": "8/26/23",
                "time": 142
            },
            {
                "date": "2/27/23",
                "time": 140
            },
            {
                "date": "3/5/23",
                "time": 140
            },
            {
                "date": "3/26/23",
                "time": 140
            },
            {
                "date": "8/27/23",
                "time": 139
            },
            {
                "date": "8/6/23",
                "time": 138
            },
            {
                "date": "3/27/23",
                "time": 132
            },
            {
                "date": "9/7/23",
                "time": 132
            },
            {
                "date": "8/19/23",
                "time": 131
            },
            {
                "date": "1/1/23",
                "time": 130
            },
            {
                "date": "3/21/23",
                "time": 130
            },
            {
                "date": "3/11/23",
                "time": 127
            },
            {
                "date": "8/20/23",
                "time": 125
            },
            {
                "date": "8/29/23",
                "time": 125
            },
            {
                "date": "9/1/23",
                "time": 124
            },
            {
                "date": "8/4/23",
                "time": 122
            },
            {
                "date": "4/3/23",
                "time": 121
            },
            {
                "date": "10/10/23",
                "time": 121
            },
            {
                "date": "1/3/23",
                "time": 120
            },
            {
                "date": "1/23/23",
                "time": 120
            },
            {
                "date": "4/9/23",
                "time": 120
            },
            {
                "date": "6/14/23",
                "time": 120
            },
            {
                "date": "7/14/23",
                "time": 120
            },
            {
                "date": "3/30/23",
                "time": 118
            },
            {
                "date": "3/2/23",
                "time": 117
            },
            {
                "date": "4/14/23",
                "time": 117
            },
            {
                "date": "8/28/23",
                "time": 117
            },
            {
                "date": "4/10/23",
                "time": 115
            },
            {
                "date": "5/21/23",
                "time": 113
            },
            {
                "date": "9/29/23",
                "time": 113
            },
            {
                "date": "1/14/23",
                "time": 112
            },
            {
                "date": "8/12/23",
                "time": 111
            },
            {
                "date": "1/6/23",
                "time": 110
            },
            {
                "date": "1/11/23",
                "time": 110
            },
            {
                "date": "4/11/23",
                "time": 110
            },
            {
                "date": "5/14/23",
                "time": 110
            },
            {
                "date": "8/21/23",
                "time": 110
            },
            {
                "date": "3/20/23",
                "time": 109
            },
            {
                "date": "4/29/23",
                "time": 105
            },
            {
                "date": "8/24/23",
                "time": 105
            },
            {
                "date": "9/13/23",
                "time": 105
            },
            {
                "date": "7/1/23",
                "time": 103
            },
            {
                "date": "4/19/23",
                "time": 102
            },
            {
                "date": "9/12/23",
                "time": 102
            },
            {
                "date": "11/1/23",
                "time": 102
            },
            {
                "date": "11/30/23",
                "time": 101
            },
            {
                "date": "12/9/23",
                "time": 101
            },
            {
                "date": "1/4/23",
                "time": 100
            },
            {
                "date": "2/16/23",
                "time": 100
            },
            {
                "date": "2/20/23",
                "time": 100
            },
            {
                "date": "4/2/23",
                "time": 100
            },
            {
                "date": "5/6/23",
                "time": 100
            },
            {
                "date": "5/19/23",
                "time": 100
            },
            {
                "date": "6/25/23",
                "time": 100
            },
            {
                "date": "7/25/23",
                "time": 100
            },
            {
                "date": "7/28/23",
                "time": 100
            },
            {
                "date": "10/25/23",
                "time": 100
            },
            {
                "date": "9/10/23",
                "time": 99
            },
            {
                "date": "10/11/23",
                "time": 99
            },
            {
                "date": "4/5/23",
                "time": 98
            },
            {
                "date": "10/3/23",
                "time": 98
            },
            {
                "date": "3/17/23",
                "time": 97
            },
            {
                "date": "7/23/23",
                "time": 96
            },
            {
                "date": "1/8/23",
                "time": 95
            },
            {
                "date": "4/7/23",
                "time": 95
            },
            {
                "date": "4/17/23",
                "time": 95
            },
            {
                "date": "6/6/23",
                "time": 95
            },
            {
                "date": "6/30/23",
                "time": 95
            },
            {
                "date": "9/9/23",
                "time": 95
            },
            {
                "date": "11/19/23",
                "time": 95
            },
            {
                "date": "1/17/23",
                "time": 94
            },
            {
                "date": "2/5/23",
                "time": 94
            },
            {
                "date": "11/18/23",
                "time": 93
            },
            {
                "date": "1/15/23",
                "time": 92
            },
            {
                "date": "12/3/23",
                "time": 92
            },
            {
                "date": "1/12/23",
                "time": 91
            },
            {
                "date": "6/27/23",
                "time": 91
            },
            {
                "date": "8/2/23",
                "time": 91
            },
            {
                "date": "8/22/23",
                "time": 91
            },
            {
                "date": "9/14/23",
                "time": 91
            },
            {
                "date": "9/30/23",
                "time": 91
            },
            {
                "date": "1/9/23",
                "time": 90
            },
            {
                "date": "2/25/23",
                "time": 90
            },
            {
                "date": "5/29/23",
                "time": 90
            },
            {
                "date": "5/30/23",
                "time": 90
            },
            {
                "date": "6/7/23",
                "time": 90
            },
            {
                "date": "6/28/23",
                "time": 90
            },
            {
                "date": "7/3/23",
                "time": 90
            },
            {
                "date": "7/5/23",
                "time": 90
            },
            {
                "date": "9/17/23",
                "time": 90
            },
            {
                "date": "10/13/23",
                "time": 90
            },
            {
                "date": "1/27/23",
                "time": 89
            },
            {
                "date": "4/16/23",
                "time": 89
            },
            {
                "date": "1/24/23",
                "time": 88
            },
            {
                "date": "2/17/23",
                "time": 88
            },
            {
                "date": "9/3/23",
                "time": 88
            },
            {
                "date": "4/30/23",
                "time": 87
            },
            {
                "date": "12/7/23",
                "time": 87
            },
            {
                "date": "12/17/23",
                "time": 87
            },
            {
                "date": "9/2/23",
                "time": 86
            },
            {
                "date": "7/6/23",
                "time": 85
            },
            {
                "date": "7/17/23",
                "time": 85
            },
            {
                "date": "10/7/23",
                "time": 85
            },
            {
                "date": "10/8/23",
                "time": 85
            },
            {
                "date": "2/28/23",
                "time": 83
            },
            {
                "date": "3/3/23",
                "time": 83
            },
            {
                "date": "3/22/23",
                "time": 83
            },
            {
                "date": "4/21/23",
                "time": 83
            },
            {
                "date": "5/17/23",
                "time": 83
            },
            {
                "date": "5/24/23",
                "time": 83
            },
            {
                "date": "11/11/23",
                "time": 83
            },
            {
                "date": "1/2/23",
                "time": 82
            },
            {
                "date": "8/10/23",
                "time": 82
            },
            {
                "date": "8/17/23",
                "time": 81
            },
            {
                "date": "9/21/23",
                "time": 81
            },
            {
                "date": "9/28/23",
                "time": 81
            },
            {
                "date": "12/10/23",
                "time": 81
            },
            {
                "date": "12/13/23",
                "time": 81
            },
            {
                "date": "1/25/23",
                "time": 80
            },
            {
                "date": "2/11/23",
                "time": 80
            },
            {
                "date": "2/13/23",
                "time": 80
            },
            {
                "date": "3/7/23",
                "time": 80
            },
            {
                "date": "3/12/23",
                "time": 80
            },
            {
                "date": "3/19/23",
                "time": 80
            },
            {
                "date": "5/8/23",
                "time": 80
            },
            {
                "date": "6/23/23",
                "time": 80
            },
            {
                "date": "6/24/23",
                "time": 80
            },
            {
                "date": "7/15/23",
                "time": 80
            },
            {
                "date": "7/30/23",
                "time": 80
            },
            {
                "date": "8/18/23",
                "time": 80
            },
            {
                "date": "3/23/23",
                "time": 79
            },
            {
                "date": "7/19/23",
                "time": 79
            },
            {
                "date": "7/21/23",
                "time": 79
            },
            {
                "date": "8/7/23",
                "time": 79
            },
            {
                "date": "8/25/23",
                "time": 79
            },
            {
                "date": "8/31/23",
                "time": 79
            },
            {
                "date": "10/19/23",
                "time": 79
            },
            {
                "date": "8/13/23",
                "time": 78
            },
            {
                "date": "2/26/23",
                "time": 77
            },
            {
                "date": "4/27/23",
                "time": 77
            },
            {
                "date": "7/29/23",
                "time": 77
            },
            {
                "date": "11/21/23",
                "time": 77
            },
            {
                "date": "11/26/23",
                "time": 77
            },
            {
                "date": "12/16/23",
                "time": 77
            },
            {
                "date": "5/11/23",
                "time": 76
            },
            {
                "date": "6/22/23",
                "time": 76
            },
            {
                "date": "8/30/23",
                "time": 76
            },
            {
                "date": "11/8/23",
                "time": 76
            },
            {
                "date": "1/31/23",
                "time": 75
            },
            {
                "date": "2/22/23",
                "time": 75
            },
            {
                "date": "3/28/23",
                "time": 75
            },
            {
                "date": "4/4/23",
                "time": 75
            },
            {
                "date": "4/22/23",
                "time": 75
            },
            {
                "date": "4/26/23",
                "time": 75
            },
            {
                "date": "5/5/23",
                "time": 75
            },
            {
                "date": "6/5/23",
                "time": 75
            },
            {
                "date": "7/8/23",
                "time": 75
            },
            {
                "date": "7/16/23",
                "time": 75
            },
            {
                "date": "10/22/23",
                "time": 75
            },
            {
                "date": "11/9/23",
                "time": 74
            },
            {
                "date": "5/22/23",
                "time": 73
            },
            {
                "date": "7/27/23",
                "time": 73
            },
            {
                "date": "9/11/23",
                "time": 73
            },
            {
                "date": "11/20/23",
                "time": 73
            },
            {
                "date": "3/24/23",
                "time": 72
            },
            {
                "date": "5/10/23",
                "time": 72
            },
            {
                "date": "9/23/23",
                "time": 72
            },
            {
                "date": "10/29/23",
                "time": 72
            },
            {
                "date": "12/2/23",
                "time": 71
            },
            {
                "date": "2/4/23",
                "time": 70
            },
            {
                "date": "4/28/23",
                "time": 70
            },
            {
                "date": "6/13/23",
                "time": 70
            },
            {
                "date": "12/1/23",
                "time": 70
            },
            {
                "date": "5/27/23",
                "time": 69
            },
            {
                "date": "12/8/23",
                "time": 69
            },
            {
                "date": "12/11/23",
                "time": 69
            },
            {
                "date": "2/1/23",
                "time": 68
            },
            {
                "date": "5/2/23",
                "time": 68
            },
            {
                "date": "5/12/23",
                "time": 68
            },
            {
                "date": "8/16/23",
                "time": 68
            },
            {
                "date": "10/4/23",
                "time": 68
            },
            {
                "date": "10/26/23",
                "time": 68
            },
            {
                "date": "10/30/23",
                "time": 68
            },
            {
                "date": "11/4/23",
                "time": 68
            },
            {
                "date": "11/24/23",
                "time": 68
            },
            {
                "date": "12/6/23",
                "time": 68
            },
            {
                "date": "1/19/23",
                "time": 67
            },
            {
                "date": "2/14/23",
                "time": 67
            },
            {
                "date": "10/5/23",
                "time": 67
            },
            {
                "date": "11/6/23",
                "time": 67
            },
            {
                "date": "12/4/23",
                "time": 67
            },
            {
                "date": "1/29/23",
                "time": 66
            },
            {
                "date": "2/15/23",
                "time": 66
            },
            {
                "date": "5/15/23",
                "time": 66
            },
            {
                "date": "7/10/23",
                "time": 66
            },
            {
                "date": "7/22/23",
                "time": 66
            },
            {
                "date": "8/14/23",
                "time": 66
            },
            {
                "date": "9/15/23",
                "time": 66
            },
            {
                "date": "11/5/23",
                "time": 66
            },
            {
                "date": "11/12/23",
                "time": 66
            },
            {
                "date": "11/15/23",
                "time": 66
            },
            {
                "date": "11/22/23",
                "time": 66
            },
            {
                "date": "1/10/23",
                "time": 65
            },
            {
                "date": "2/8/23",
                "time": 65
            },
            {
                "date": "2/12/23",
                "time": 65
            },
            {
                "date": "3/8/23",
                "time": 65
            },
            {
                "date": "5/1/23",
                "time": 65
            },
            {
                "date": "6/20/23",
                "time": 65
            },
            {
                "date": "10/9/23",
                "time": 65
            },
            {
                "date": "10/21/23",
                "time": 65
            },
            {
                "date": "3/14/23",
                "time": 64
            },
            {
                "date": "5/13/23",
                "time": 64
            },
            {
                "date": "5/28/23",
                "time": 64
            },
            {
                "date": "7/20/23",
                "time": 64
            },
            {
                "date": "7/24/23",
                "time": 64
            },
            {
                "date": "8/1/23",
                "time": 64
            },
            {
                "date": "8/8/23",
                "time": 64
            },
            {
                "date": "10/27/23",
                "time": 64
            },
            {
                "date": "10/28/23",
                "time": 64
            },
            {
                "date": "10/31/23",
                "time": 64
            },
            {
                "date": "11/2/23",
                "time": 64
            },
            {
                "date": "11/23/23",
                "time": 64
            },
            {
                "date": "12/12/23",
                "time": 64
            },
            {
                "date": "3/1/23",
                "time": 63
            },
            {
                "date": "4/15/23",
                "time": 63
            },
            {
                "date": "5/26/23",
                "time": 63
            },
            {
                "date": "7/12/23",
                "time": 63
            },
            {
                "date": "7/13/23",
                "time": 63
            },
            {
                "date": "12/5/23",
                "time": 63
            },
            {
                "date": "1/28/23",
                "time": 62
            },
            {
                "date": "3/9/23",
                "time": 62
            },
            {
                "date": "4/25/23",
                "time": 62
            },
            {
                "date": "5/25/23",
                "time": 62
            },
            {
                "date": "6/16/23",
                "time": 62
            },
            {
                "date": "6/17/23",
                "time": 62
            },
            {
                "date": "6/26/23",
                "time": 62
            },
            {
                "date": "6/29/23",
                "time": 62
            },
            {
                "date": "7/11/23",
                "time": 62
            },
            {
                "date": "9/18/23",
                "time": 62
            },
            {
                "date": "9/24/23",
                "time": 62
            },
            {
                "date": "9/27/23",
                "time": 62
            },
            {
                "date": "10/2/23",
                "time": 62
            },
            {
                "date": "10/17/23",
                "time": 62
            },
            {
                "date": "11/10/23",
                "time": 62
            },
            {
                "date": "11/14/23",
                "time": 62
            },
            {
                "date": "11/29/23",
                "time": 62
            },
            {
                "date": "2/2/23",
                "time": 61
            },
            {
                "date": "2/19/23",
                "time": 61
            },
            {
                "date": "3/25/23",
                "time": 61
            },
            {
                "date": "6/18/23",
                "time": 61
            },
            {
                "date": "6/19/23",
                "time": 61
            },
            {
                "date": "10/20/23",
                "time": 61
            },
            {
                "date": "10/24/23",
                "time": 61
            },
            {
                "date": "11/7/23",
                "time": 61
            },
            {
                "date": "12/14/23",
                "time": 61
            },
            {
                "date": "1/16/23",
                "time": 60
            },
            {
                "date": "1/18/23",
                "time": 60
            },
            {
                "date": "1/20/23",
                "time": 60
            },
            {
                "date": "1/22/23",
                "time": 60
            },
            {
                "date": "1/26/23",
                "time": 60
            },
            {
                "date": "1/30/23",
                "time": 60
            },
            {
                "date": "2/3/23",
                "time": 60
            },
            {
                "date": "2/6/23",
                "time": 60
            },
            {
                "date": "2/7/23",
                "time": 60
            },
            {
                "date": "2/9/23",
                "time": 60
            },
            {
                "date": "2/10/23",
                "time": 60
            },
            {
                "date": "2/23/23",
                "time": 60
            },
            {
                "date": "2/24/23",
                "time": 60
            },
            {
                "date": "3/6/23",
                "time": 60
            },
            {
                "date": "3/13/23",
                "time": 60
            },
            {
                "date": "3/15/23",
                "time": 60
            },
            {
                "date": "4/8/23",
                "time": 60
            },
            {
                "date": "4/13/23",
                "time": 60
            },
            {
                "date": "4/20/23",
                "time": 60
            },
            {
                "date": "4/23/23",
                "time": 60
            },
            {
                "date": "4/24/23",
                "time": 60
            },
            {
                "date": "5/3/23",
                "time": 60
            },
            {
                "date": "5/4/23",
                "time": 60
            },
            {
                "date": "5/7/23",
                "time": 60
            },
            {
                "date": "5/9/23",
                "time": 60
            },
            {
                "date": "5/16/23",
                "time": 60
            },
            {
                "date": "5/18/23",
                "time": 60
            },
            {
                "date": "5/20/23",
                "time": 60
            },
            {
                "date": "5/23/23",
                "time": 60
            },
            {
                "date": "5/31/23",
                "time": 60
            },
            {
                "date": "6/1/23",
                "time": 60
            },
            {
                "date": "6/8/23",
                "time": 60
            },
            {
                "date": "6/9/23",
                "time": 60
            },
            {
                "date": "6/10/23",
                "time": 60
            },
            {
                "date": "6/11/23",
                "time": 60
            },
            {
                "date": "6/12/23",
                "time": 60
            },
            {
                "date": "6/15/23",
                "time": 60
            },
            {
                "date": "6/21/23",
                "time": 60
            },
            {
                "date": "7/2/23",
                "time": 60
            },
            {
                "date": "7/9/23",
                "time": 60
            },
            {
                "date": "7/26/23",
                "time": 60
            },
            {
                "date": "7/31/23",
                "time": 60
            },
            {
                "date": "8/3/23",
                "time": 60
            },
            {
                "date": "8/9/23",
                "time": 60
            },
            {
                "date": "8/15/23",
                "time": 60
            },
            {
                "date": "9/16/23",
                "time": 60
            },
            {
                "date": "9/19/23",
                "time": 60
            },
            {
                "date": "9/20/23",
                "time": 60
            },
            {
                "date": "9/22/23",
                "time": 60
            },
            {
                "date": "9/25/23",
                "time": 60
            },
            {
                "date": "9/26/23",
                "time": 60
            },
            {
                "date": "10/1/23",
                "time": 60
            },
            {
                "date": "10/6/23",
                "time": 60
            },
            {
                "date": "10/12/23",
                "time": 60
            },
            {
                "date": "10/14/23",
                "time": 60
            },
            {
                "date": "10/15/23",
                "time": 60
            },
            {
                "date": "10/16/23",
                "time": 60
            },
            {
                "date": "10/18/23",
                "time": 60
            },
            {
                "date": "10/23/23",
                "time": 60
            },
            {
                "date": "11/3/23",
                "time": 60
            },
            {
                "date": "11/13/23",
                "time": 60
            },
            {
                "date": "11/16/23",
                "time": 60
            },
            {
                "date": "11/17/23",
                "time": 60
            },
            {
                "date": "11/25/23",
                "time": 60
            },
            {
                "date": "11/27/23",
                "time": 60
            },
            {
                "date": "11/28/23",
                "time": 60
            },
            {
                "date": "12/15/23",
                "time": 60
            }
        ]
    };
}