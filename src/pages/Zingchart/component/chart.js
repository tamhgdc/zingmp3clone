import { Line } from 'react-chartjs-2';

function Chart({ chart }) {
    let times = [];

    let values = [];

    let datas = [];
    if (chart.length !== 0) {
        const items2 = chart.RTChart.chart.items;
        for (let i = 0; i < chart.RTChart.chart.times.length; i++) {
            times.push(chart.RTChart.chart.times[i].hour);
        }

        for (let i = 0; i < Object.keys(items2).length; i++) {
            for (let j = 0; j < Object.values(items2)[i].length; j++) {
                values.push(Object.values(items2)[i][j].counter);
            }
            const color = ['#4A90E2', '#27BD9C', '#E35050'];
            datas.push({
                label: chart.RTChart.items[i].title,
                borderColor: color[i],
                data: values.splice(0, 24),
                tension: 0.4,
                backgroundColor: color[i],
                pointRadius: 3,
                pointHoverRadius: 8,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 2,
                pointBorderColor: '#fff',
                showLine: true,
            });
        }
    }

    const state = {
        labels: times,
        datasets: datas,
    };

    return (
        <div className="zing-chart-canvas">
            <Line
                data={state}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                        },
                        legend: {
                            labels: {
                                color: 'white',
                            },
                        },
                    },
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Time ( hour)',
                                color: 'white',
                            },
                            ticks: {
                                color: 'white',
                            },
                        },
                        y: {
                            display: false,
                            title: {
                                display: false,
                            },
                            suggestedMin: 0,
                        },
                    },
                    chartArea: {
                        backgroundColor: 'rgba(251, 85, 85, 0.4)',
                    },
                }}
            />
        </div>
    );
}

export default Chart;
