import React from "react";
import {
  Form,
  Input,
  TextArea,
  Divider,
  Header,
  Button,
  Segment,
} from "semantic-ui-react";

const Volunteer = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [borough, setBorough] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");

  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            required
            control={Input}
            label="First Name"
            placeholder="First Name"
          />
          <Form.Field
            required
            control={Input}
            label="Last Name"
            placeholder="Last Name"
          />
          <Form.Field
            required
            control={Input}
            label="Pronouns"
            placeholder="Pronouns"
          />
        </Form.Group>
        <Form.Field
          label="Address"
          control={Input}
          // onChange={(evt) => setAddress(evt.target.value)}
          // value={address}
          placeholder="Address"
        />
        <Form.Group widths="equal">
          <Form.Field
            required
            label="City"
            control={Input}
            // onChange={(evt) => setCity(evt.target.value)}
            // value={city}
            placeholder="City"
          />
          <Form.Field
            required
            label="State"
            control="select"
            placeholder="Select State"
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
            // onChange={(evt) => setAddress(evt.target.value)}
            // value={address}
            placeholder="Zipcode"
          />
          <Form.Field label="Borough" control="select">
            <option>Select NYC Borough</option>
            <option>Bronx</option>
            <option>Queens</option>
            <option>Manhatten</option>
            <option>Brooklyn</option>
            <option>Staten Island</option>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            required
            label="Email"
            control={Input}
            // onChange={(evt) => setEmail(evt.target.value)}
            // value={email}
            placeholder="Email Address"
          />
          <Form.Field
            label="Phone Number"
            control={Input}
            // onChange={(evt) => setPhone(evt.target.value)}
            // value={phone}
            placeholder="(xxx)-xxx-xxxx"
          />
        </Form.Group>
        <Header as="h5">Preferred Communication Method:</Header>
        <Form.Group>
          <Form.Field>
            <Form.Checkbox label="Ok to Call" />
            <Form.Checkbox label="Ok to Email" />
            <Form.Checkbox label="Ok to Mail" />
            <Form.Checkbox label="Ok to Text/SMS" />
            <Form.Checkbox label="Do not Call" />
            <Form.Checkbox label="Do not Email" />
            <Form.Checkbox label="Do not Mail" />
            <Form.Checkbox label="Do not Text/SMS" />
          </Form.Field>
        </Form.Group>
        <Divider hidden />
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="How did you hear about us?"
        />
      </Form>
      <Divider hidden />
      <Segment basic textAlign={"center"}>
        <Button
          positive
          style={{textAlign: "center"}}
        >
          Submit Info
        </Button>
      </Segment>
    </div>
  );
};

export default Volunteer;
