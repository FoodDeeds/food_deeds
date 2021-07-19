import React, { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Divider,
  Button,
  Segment,
  Header,
} from "semantic-ui-react";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const Volunteer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [borough, setBorough] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleBack = () => {
    history.push({
      pathname: "/faq",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    db.collection("Volunteers")
      .add({
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        borough: borough,
        email: email,
        phone: phone,
        message: message,
      })
      .then(() => {
        setFirstName("");
        setLastName("");
        setAddress("");
        setCity("");
        setState("");
        setZipcode("");
        setBorough("");
        setEmail("");
        setPhone("");
        setMessage("");
        setError("");
        history.push("/faq");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <Segment padded="very">
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              required
              label="First Name"
              control="input"
              onChange={(evt) => setFirstName(evt.target.value)}
              value={firstName}
              placeholder="First Name"
            />
            <Form.Field
              required
              label="Last Name"
              control="input"
              onChange={(evt) => setLastName(evt.target.value)}
              value={lastName}
              placeholder="Last Name"
            />
          </Form.Group>
          <Form.Field
            label="Address"
            control={Input}
            onChange={(evt) => setAddress(evt.target.value)}
            value={address}
            placeholder="Address"
          />
          <Form.Group widths="equal">
            <Form.Field
              required
              label="City"
              control={Input}
              onChange={(evt) => setCity(evt.target.value)}
              value={city}
              placeholder="City"
            />
            <Form.Field
              required
              placeholder="Select State"
              label="State"
              control="select"
              onChange={(evt) => setState(evt.target.value)}
            >
              <option></option>
              <option value="Alabama">AL</option>
              <option value="Alaska">AK</option>
              <option value="Arizona">AZ</option>
              <option value="Arkansas">AR</option>
              <option value="California">CA</option>
              <option value="Colorado">CO</option>
              <option value="Connecticut">CT</option>
              <option value="Delaware">DE</option>
              <option value="Florida">FL</option>
              <option value="Georgia">GA</option>
              <option value="Hawaii">HI</option>
              <option value="Idaho">ID</option>
              <option value="Illinois">IL</option>
              <option value="Indiana">IN</option>
              <option value="Iowa">IA</option>
              <option value="Kansas">KS</option>
              <option value="Kentucky">KY</option>
              <option value="Louisiana">LA</option>
              <option value="Maine">MA</option>
              <option value="Maryland">MD</option>
              <option value="Massachusetts">MA</option>
              <option value="Michigan">MI</option>
              <option value="Minnesota">MN</option>
              <option value="Mississippi">MS</option>
              <option value="Missouri">MO</option>
              <option value="Montana">MT</option>
              <option value="Nebraska">NE</option>
              <option value="Nevada">NV</option>
              <option value="New Hampshire">NH</option>
              <option value="New Jersey">NJ</option>
              <option value="New Mexico">NM</option>
              <option value="New York">NY</option>
              <option value="North Carolina">NC</option>
              <option value="North Dakota">ND</option>
              <option value="Ohio">OH</option>
              <option value="Oklahoma">OK</option>
              <option value="Oregon">OR</option>
              <option value="Pennsylvania">PA</option>
              <option value="Rhode Island">RI</option>
              <option value="South Carolina">SC</option>
              <option value="South Dakota">SD</option>
              <option value="Tennessee">TN</option>
              <option value="Texas">TX</option>
              <option value="Utah">UT</option>
              <option value="Vermont">VT</option>
              <option value="Virginia">VA</option>
              <option value="Washington">WA</option>
              <option value="West Virginia">WV</option>
              <option value="Wisconsin">WI</option>
              <option value="Wyoming">WY</option>
            </Form.Field>
            <Form.Field
              label="Zipcode"
              control={Input}
              onChange={(evt) => setZipcode(evt.target.value)}
              value={zipcode}
              placeholder="Zipcode"
            />
            <Form.Field
              placeholder="Select Borough"
              label="Borough"
              control="select"
              onChange={(evt) => setBorough(evt.target.value)}
            >
              <option>Select NYC Borough</option>
              <option>Bronx</option>
              <option>Queens</option>
              <option>Manhattan</option>
              <option>Brooklyn</option>
              <option>Staten Island</option>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              required
              label="Email"
              control={Input}
              onChange={(evt) => setEmail(evt.target.value)}
              value={email}
              placeholder="Email Address"
            />
            <Form.Field
              label="Phone Number"
              control={Input}
              onChange={(evt) => setPhone(evt.target.value)}
              value={phone}
              placeholder="(xxx)-xxx-xxxx"
            />
          </Form.Group>
          <Divider hidden />
          <Form.Field
            control={TextArea}
            label="How did you hear about us?"
            value={message}
            onChange={(evt) => setMessage(evt.target.value)}
          />
        </Form>
        <Divider hidden />
        <Segment basic textAlign={"center"}>
          <Button
            onClick={handleSubmit}
            positive
            style={{ textAlign: "center" }}
          >
            Submit Info
          </Button>
          <br />
          <br />
          <Button type="submit" onClick={handleBack} color="orange">
            Back to FAQ
          </Button>
        </Segment>
      </Segment>
    </div>
  );
};

export default Volunteer;
