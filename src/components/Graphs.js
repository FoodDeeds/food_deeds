import React from "react";
import { Pie } from "react-chartjs-2";

const Graphs = ({ donations }) => {
  const filterDate = (month) => {
    const monthlyDonation = donations.filter((july) =>
      july.info.PickupDate.includes(month)
    );
    let total = 0;
    for (let i = 0; i < monthlyDonation.length; i++) {
      if (monthlyDonation[i].info.Status !== null) {
        let qty = monthlyDonation[i].info.Quantity;
        total += Number.parseInt(qty);
      }
    }
    return total;
  };

  const labels = () => {
    let result = [];

    const dates = donations.map((donation) => {
      const datesSliced = donation.info.PickupDate.slice(0, 7);
      return datesSliced;
    });

    for (let i = 0; i < dates.length; i++) {
      if (!result.includes(dates[i])) {
        result.push(dates[i]);
      }
    }
    console.log("result", result);
    let newLabel = result.sort().slice(-3);
    return newLabel;
  };

  const data = labels().map((label) => filterDate(label));
  console.log("labels", labels());
  console.log("data", data);
  return (
    <div>
      <Pie
        data={{
          labels: labels(),
          datasets: [
            {
              label: "# of votes",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={200}
        width={200}
        options={{
          maintainAspectRatio: false,

          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
};

export default Graphs;
