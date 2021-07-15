import React, { useState, useEffect } from "react";
import { Button, Item } from "semantic-ui-react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const GivingHistory = (props) => {
  const userInfo = props.userInfo;
  const [donations, setDonations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection("Donations")
      .where("supplierId", "==", `${userInfo.id}`)
      .onSnapshot((snapshot) => {
        setDonations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            info: doc.data(),
          }))
        );
      });
  }, [userInfo.id]);

  const handleEdit = (donation) => {
    history.push({
      pathname: "/donationedit",
      state: {
        donation
      },
    });
  };

  const handleDelete = (donation) => {
    db.collection("Donations").doc(donation.id).delete();
  };
  const totalQty = function () {
    let total = 0;
    for (let i = 0; i < donations.length; i++) {
      let qty = donations[i].info.Quantity;
      console.log(qty);
      total += Number.parseInt(qty);
    }
    return total;
  };

  return (
    <div>
      <h3>Giving History</h3>
      <p>You have donated a total of {totalQty()} boxes of food. Way to go!</p>
      {donations.map((donation) => (
        <div className="result" key={donation.id}>
          <Item.Group divided style={{ marginLeft: 30 }}>
            <Item>
              <br />
              <Item.Content>
                <Item.Header as="a">{donation.info.supplierName}</Item.Header>
                <Item.Meta>
                  Pick Up Time: <br />
                  {donation.info.PickupTime} on {donation.info.PickupDate}{" "}
                  <br />
                </Item.Meta>
                Quantity: {donation.info.Quantity} boxes
                <Item.Description>
                  {" "}
                  Description: {donation.info.Description}
                </Item.Description>
                <br />
              </Item.Content>

              <Button
                donation={donation}
                basic
                color="green"
                style={{ width: 100, height: 30, marginRight: 20 }}
                onClick={() => handleEdit(donation)}
              >
                Edit
              </Button>
              <Button
                basic
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this?"))
                    handleDelete(donation);
                }}
                color="green"
                style={{ width: 100, height: 30, marginRight: 20 }}
              >
                Delete
              </Button>
            </Item>
          </Item.Group>
        </div>
      ))}
    </div>
  );
};

export default GivingHistory;
