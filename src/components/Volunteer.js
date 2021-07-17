import React from "react";
import { Form, Input} from "semantic-ui-react";

const Volunteer = () => {
  return (
    <div>
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="First name"
          placeholder="First name"
        />
        <Form.Field control={Input} label="Last name" placeholder="Last name" />
      </Form.Group>
      <Form.Field
      label="Borough"
      control="select"
      >
        <option>Select NYC Borough</option>
        <option>Bronx</option>
        <option>Queens</option>
        <option>Manhatten</option>
        <option>Brooklyn</option>
        <option>Staten Island</option>
      </Form.Field>
    </Form>
    </div>
  );
};

export default Volunteer;
