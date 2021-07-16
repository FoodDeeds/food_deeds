import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Header, Form, Button, Image } from 'semantic-ui-react'
import { db, storage } from '../firebase'

const EditDonation = ({ location }) => {
  const { donation } = location.state
  console.log(donation)
  // need to destructure location.state.donation & location.state.userInfo
  const [description, setDescription] = useState(donation.info.Description)
  const [quantity, setQuantity] = useState(donation.info.Quantity)
  const [pickupDate, setPickupDate] = useState(donation.info.PickupDate)
  const [pickupTime, setPickupTime] = useState(donation.info.PickupTime)
  const history = useHistory()

  const handleUpdate = () => {
    db.collection('Donations')
      .doc(donation.id)
      .set({
        Description: description,
        Quantity: quantity,
        PickupDate: pickupDate,
        PickupTime: pickupTime
      },
      { merge: true }
      )
      .then(() => {
        history.push({
          pathname: '/account'
        })
      })
  }

  const handleClick = () => {
    history.push({
      pathname: '/account'
    })
  }

  return (
    <Form>
      <Header as="h2" color="green" style={{ marginLeft: 40 }}>
        Edit Donation Details
      </Header>
      <Form.Field>
        <label style={{ marginLeft: 25 }}>Description</label>
        <input
          required
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
          style={{ marginLeft: 20, width: 350, marginRight: 20 }}
        />
        <br />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 25 }}>Quantity</label>
        <input
          value={quantity}
          onChange={(evt) => setQuantity(evt.target.value)}
          style={{ marginLeft: 20, width: 350, marginRight: 30 }}
        />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 25 }}>Pickup Date</label>
        <input
          type="date"
          value={pickupDate}
          onChange={(evt) => setPickupDate(evt.target.value)}
          style={{ marginLeft: 20, width: 350, marginRight: 20 }}
        />
        <br />
      </Form.Field>
      <Form.Field>
        <label style={{ marginLeft: 25 }}>Time</label>
        <input
          type="time"
          value={pickupTime}
          onChange={(evt) => setPickupTime(evt.target.value)}
          style={{ marginLeft: 20, width: 350, marginRight: 20 }}
        />
      </Form.Field>
      <Button
        type="submit"
        onClick={handleUpdate}
        color="green"
        style={{ marginLeft: 45, marginTop: 15, marginBottom: 25 }}
      >
        Save Changes
      </Button>
      <Button
        type="submit"
        onClick={handleClick}
        color="green"
        style={{ marginLeft: 10, marginTop: 15, marginBottom: 25 }}
      >
        Return to Account
      </Button>
    </Form>
  )
}

export default EditDonation
