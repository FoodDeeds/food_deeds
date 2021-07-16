import React from "react";
import { Divider, Image, Header, Item, Segment } from "semantic-ui-react";
import donation from "../images/donation.png";
import volunteer from "../images/volunteer.png";
import calender from "../images/calender.jpg";
import information from "../images/information.png";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <div>
      <Header>“Alone we can do so little; together we can do so much”</Header>
      <Divider hidden />
      <Image.Group size="medium">
        <Segment>
          <Item attached>
            <Header as="h2" attached="top" textAlign="center" >
              Volunteer
            </Header>
            <Link>
              <Image src={volunteer} alt="Volunteer" centered/>
            </Link>
          </Item>
        </Segment>
        <Segment>
          <Item attached>
            <Header as="h2" attached="top" textAlign="center" >
              Give What You Can
            </Header>
            <Link>
            <Image style={{marginTop: 15}}  src={donation} />
            </Link>
          </Item>
        </Segment>
        <Segment>
          <Item attached>
            <Header as="h2" attached="top" textAlign="center">
              Upcoming Events
            </Header>
            <Link>
              <Image style={{marginTop: 15}}  src={calender} />
            </Link>
          </Item>
        </Segment>
        <Segment>
          <Item attached>
            <Header as="h2" attached="top" textAlign="center">
              Learn More
            </Header>
            <Link>
              <Item.Image style={{marginTop: 15}}  src={information}  centered/>
            </Link>
          </Item>
        </Segment>
      </Image.Group>
    </div>
  );
};

export default Faq;
