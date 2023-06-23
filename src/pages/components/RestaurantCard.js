import React from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import SlideA from "../../images/slides/slide-a.jpg";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  Button,
} from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockDes, BackTo } from "../../components/block/Block";
import { PreviewCard, CodeBlock } from "../../components/preview/Preview";

const RestaurantCard = ({ ...props }) => {
  return (
    <React.Fragment>
      <Content page="component">

        <Block size="lg">
          {/*<PreviewCard>*/}
          {/*  <Row>*/}
              <Col lg="4">
                <Card className="card-bordered">
                  <CardImg top src={SlideA} alt="" />
                  <CardBody className="card-inner">
                    <CardTitle tag="h5">Card with stretched link</CardTitle>
                    <CardText>
                      Some quick example text to build on the card title and make up the bulk of the card"s content.
                    </CardText>
                    <Button color="primary">Go somewhere</Button>
                  </CardBody>
                </Card>
              </Col>
            {/*</Row>*/}
          {/*</PreviewCard>*/}
        </Block>


      </Content>
    </React.Fragment>
  );
};

export default RestaurantCard;
