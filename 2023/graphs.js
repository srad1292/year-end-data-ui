
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
                    label: 'Planning',
                    data: data.timeSpent.projectPlanning,
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
                    label: 'Research/Studying',
                    data: data.timeSpent.researchAndStudying,
                    fill: false
                },
                {
                    label: 'Writing',
                    data: data.timeSpent.writing,
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
                type: 'doughnut',
                data: {
                    // labels: ['Awful', 'Bad', 'Unremarkable', 'Good', 'Great'],
                    datasets: [
                        {
                            label: 'Happiness',
                            data: [
                                data.happiness[index].one, data.happiness[index].two, data.happiness[index].three, 
                                data.happiness[index].four, data.happiness[index].five, 
                            ],
                            backgroundColor: [
                                'rgb(54, 52, 46)',
                                'rgb(212, 44, 6)',
                                'rgb(237, 237, 38)',
                                'rgb(20, 150, 20)',
                                'rgb(65, 250, 228)',
                            ],
                            hoverOffset: 2
                        }
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: month
                        }
                    }
                }
            });
        }
    });
}


function getData() {
    return {"weights":[{"date":"1/1/23","weight":"220.2"},{"date":"1/8/23","weight":"220"},{"date":"1/15/23","weight":"219"},{"date":"1/22/23","weight":"218"},{"date":"1/29/23","weight":"218"},{"date":"2/5/23","weight":"217.2"},{"date":"2/12/23","weight":"216.5"},{"date":"2/19/23","weight":"215"},{"date":"2/26/23","weight":"215"},{"date":"3/5/23","weight":"214"},{"date":"3/12/23","weight":"213.4"},{"date":"3/19/23","weight":"213"},{"date":"3/26/23","weight":"213.5"},{"date":"4/2/23","weight":"212.4"},{"date":"4/9/23","weight":"212"},{"date":"4/16/23","weight":"211"},{"date":"4/23/23","weight":"211"},{"date":"4/30/23","weight":"211"},{"date":"5/7/23","weight":"209"},{"date":"5/14/23","weight":"208.5"},{"date":"5/21/23","weight":"208"},{"date":"5/28/23","weight":"209"},{"date":"6/4/23","weight":"208"},{"date":"6/11/23","weight":"207"},{"date":"6/18/23","weight":"206"},{"date":"6/25/23","weight":"205.4"},{"date":"7/2/23","weight":"205"},{"date":"7/9/23","weight":"204.4"},{"date":"7/16/23","weight":"203.2"},{"date":"7/23/23","weight":"202.5"},{"date":"7/30/23","weight":"202"},{"date":"8/6/23","weight":"202"},{"date":"8/13/23","weight":"201"},{"date":"8/20/23","weight":"200.2"},{"date":"8/27/23","weight":"199"},{"date":"9/3/23","weight":"199"},{"date":"9/10/23","weight":"198.2"},{"date":"9/17/23","weight":"198"},{"date":"9/24/23","weight":"197"},{"date":"10/1/23","weight":"197"},{"date":"10/8/23","weight":"196"},{"date":"10/15/23","weight":"195.4"},{"date":"10/22/23","weight":"195"},{"date":"10/29/23","weight":"194"},{"date":"11/5/23","weight":"193"},{"date":"11/12/23","weight":"192.2"},{"date":"11/19/23","weight":"190"},{"date":"11/26/23","weight":"190"},{"date":"12/3/23","weight":"189"},{"date":"12/10/23","weight":"190"},{"date":"12/17/23","weight":"189"},{"date":"12/24/23","weight":"189"},{"date":"12/31/23","weight":"188.5"}],"timeSpent":{"projectPlanning":[1150,883,945,1142,965,1123,899,831,824,1089,953,1090],"gameDev":[950,864,1062,1002,904,647,818,951,975,900,828,1034],"generalProgramming":[848,827,1196,978,1056,845,934,1097,987,1053,974,1102],"vfx":[1077,1043,941,1005,943,991,945,1137,946,1124,1001,1188],"sfx":[930,986,888,873,1041,959,1094,1151,944,976,992,863],"writing":[1063,801,900,1089,826,926,876,1195,932,893,930,1134],"researchAndStudying":[1012,916,1123,955,1111,971,903,1190,1160,1076,863,974]},"happiness":[{"one":5,"two":6,"three":4,"four":9,"five":7},{"one":5,"two":5,"three":11,"four":3,"five":4},{"one":6,"two":8,"three":6,"four":3,"five":8},{"one":7,"two":5,"three":5,"four":4,"five":9},{"one":4,"two":9,"three":5,"four":6,"five":7},{"one":5,"two":3,"three":9,"four":10,"five":3},{"one":5,"two":7,"three":4,"four":5,"five":10},{"one":3,"two":5,"three":11,"four":8,"five":4},{"one":4,"two":6,"three":8,"four":5,"five":7},{"one":10,"two":6,"three":8,"four":4,"five":3},{"one":8,"two":4,"three":7,"four":7,"five":4},{"one":6,"two":7,"three":5,"four":7,"five":6}]};
}