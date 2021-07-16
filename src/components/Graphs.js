import React from "react";
import { Bar, Pie, Line, Radar } from "react-chartjs-2";

const Graphs = ({ donations }) => {
    const filterDate = (month) => {
        const julyDonation = donations.filter((july) =>
            july.info.PickupDate.includes(month)
        );
        let total = 0;
        for (let i = 0; i < julyDonation.length; i++) {
            if (julyDonation[i].info.Status !== null) {
                let qty = julyDonation[i].info.Quantity;
                total += Number.parseInt(qty);
            }
        }
        return total;
    };

    console.log("july>>>", filterDate());

    const labels = ["2021-05", "2021-06", "2021-07"];
    // data

    return (
        <div>
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "# of votes",
                            data: [12, 19, filterDate(labels[2])],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)"
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)"
                            ],
                            borderWidth: 1
                        }
                        // {
                        //   label: 'Quantity',
                        //   data: [47, 52, 67, 58, 9, 50],
                        //   backgroundColor: 'orange',
                        //   borderColor: 'red',
                        // },
                    ]
                }}
                height={400}
                width={100}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    },
                    legend: {
                        labels: {
                            fontSize: 25
                        }
                    }
                }}
            />
        </div>
    );
};

export default Graphs;
