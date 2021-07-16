import React from "react";
import { Pie } from "react-chartjs-2";

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
    let newLabel = result.slice(-3);
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
        height={400}
        width={100}
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
