import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { auth, db } from "../firebase";

const Signup = (props) => {
    const [type, setType] = useState("Supplier");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const signup = (evt) => {
        evt.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCred) => {
                db.collection("SignedUpUsers")
                    .doc(userCred.user.uid)
                    .set({
                        id: userCred.user.uid,
                        Type: type,
                        Category: category,
                        Name: name,
                        Phone: phone,
                        Email: email,
                        Password: password,
                        Address: address,
                        Zipcode: zipcode,
                        City: city,
                        State: state,
                        Image: image
                    })
                    .then(() => {
                        setType("");
                        setCategory("");
                        setName("");
                        setPhone("");
                        setEmail("");
                        setPassword("");
                        setAddress("");
                        setCity("");
                        setZipcode("");
                        setState("");
                        setError("");
                        setImage("");
                        props.history.push("/login");
                    })
                    .catch((err) => setError(err.message));
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div>
            <div autoComplete="off">
                <h2>Sign up</h2>
                <br />
                <Form style={{ marginLeft: 5 }} autoComplete="off">
                    <Form.Field
                        required
                        label="Type"
                        control="select"
                        onChange={(evt) => setType(evt.target.value)}
                        style={{ width: 350 }}
                    >
                        <option value="Supplier">Supplier</option>
                        <option value="Recipient">Recipient</option>
                    </Form.Field>
                    <Form.Field
                        required
                        label="Category"
                        control="select"
                        onChange={(evt) => setCategory(evt.target.value)}
                        style={{ width: 350 }}
                    >
                        {type === "Supplier" ? (
                            <>
                                <option value="Option">Choose Category</option>
                                <option value="Grocery Store">
                                    Grocery Store
                                </option>
                                <option value="Deli">Deli</option>
                                <option value="Cafe">Cafe</option>
                            </>
                        ) : (
                            <>
                                <option value="Option">Choose Category</option>
                                <option value="Food bank">Food Bank</option>
                            </>
                        )}
                    </Form.Field>
                    <Form.Field
                        required
                        label="Name"
                        control="input"
                        onChange={(evt) => setName(evt.target.value)}
                        value={name}
                        style={{ width: 350 }}
                        placeholder="Name"
                    />
                    <Form.Field
                        required
                        label="Phone Number"
                        control="input"
                        onChange={(evt) => setPhone(evt.target.value)}
                        value={phone}
                        style={{ width: 350 }}
                        placeholder="(xxx)-xxx-xxxx"
                    />
                    <Form.Field
                        required
                        label="Email"
                        control="input"
                        onChange={(evt) => setEmail(evt.target.value)}
                        value={email}
                        style={{ width: 350 }}
                        placeholder="Email Address"
                    />
                    <Form.Field
                        required
                        label="Password"
                        control="input"
                        onChange={(evt) => setPassword(evt.target.value)}
                        value={password}
                        style={{ width: 350 }}
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    <Form.Field
                        required
                        label="Address"
                        control="input"
                        onChange={(evt) => setAddress(evt.target.value)}
                        value={address}
                        style={{ width: 350 }}
                        placeholder="Address"
                    />
                    <Form.Field
                        required
                        label="Zip Code"
                        control="input"
                        onChange={(evt) => setZipcode(evt.target.value)}
                        value={zipcode}
                        style={{ width: 350 }}
                        placeholder="ZipCode"
                    />
                    <Form.Field
                        required
                        label="City"
                        control="input"
                        onChange={(evt) => setCity(evt.target.value)}
                        value={city}
                        style={{ width: 350 }}
                        placeholder="City"
                    />
                    <Form.Field
                        required
                        label="State"
                        control="select"
                        onChange={(evt) => setState(evt.target.value)}
                        value={state}
                        style={{ width: 200 }}
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
                    {error && <span className="error__msg">{error}</span>}
                    <Button
                        control="button"
                        animated="fade"
                        onClick={signup}
                        style={{ marginTop: 10, marginBottom: 30, width: 115 }}
                        size="small"
                        basic
                        color="green"
                    >
                        <Button.Content visible>Register</Button.Content>
                        <Button.Content hidden>
                            Let's get started!
                        </Button.Content>
                    </Button>
                </Form>
            </div>
            <p style={{ marginLeft: 5 }}> Already have an account?</p>
            <Link to="login">
                <Button
                    basic
                    color="grey"
                    size="small"
                    style={{ marginLeft: 5, marginBottom: 10 }}
                >
                    LOG IN
                </Button>
            </Link>
        </div>
    );
};

export default Signup;
