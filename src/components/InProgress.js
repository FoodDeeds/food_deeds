import React from "react";
import { Image, Header, Segment, Button, Divider } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import work from "../images/work.gif";

const Progress = () => {
  const history = useHistory();
  const handleBack = () => {
    history.push({
      pathname: "/faq",
    });
  };

  return (
    <Segment vertical basic textAlign={"center"}>
      <Header as="h2" textAlign="center">
        Come Back Soon!
      </Header>
      <Image src={work} centered />
      <br/>
      <Button type="submit" onClick={handleBack} color="orange">
        Back to FAQ
      </Button>
    </Segment>
  );
};

export default Progress;
