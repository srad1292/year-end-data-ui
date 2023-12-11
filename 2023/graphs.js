
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let data = getData(); 



buildWeightChart();
// Determine colors when real data comes in
buildTimeSpentChart();
buildHappinessCharts();


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
            responsive: true
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
                    labels: ['Awful', 'Bad', 'Normal', 'Good', 'Great'],
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


function getData() {
    return {
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
                null
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
                null
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
                null
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
                null
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
                null
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
                null
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
                null
            ]
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
                "two": 3,
                "three": 7,
                "four": 0,
                "five": 0
            }
        ]
    };
}