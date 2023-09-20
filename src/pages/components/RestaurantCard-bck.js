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
import {IMG_STORAGE_BASE_URL} from "../../config";

const RestaurantCard = ({ ...props }) => {

  const { id, name, restLogo, description, delivery, type, location, priceCategory, rating } = props;
  // console.log(restLogo)
  let bckImage = restLogo? (IMG_STORAGE_BASE_URL + restLogo) : "https://burgerlab.com.pk/wp-content/uploads/2022/02/Untitled-1-1-1.jpg?c062ef&c062ef"
  return (
    <React.Fragment>
      <Content page="component">

        <Block size="lg">
          {/*<PreviewCard>*/}
          {/*  <Row>*/}
              <Col lg="4">
                <Card className="card-bordered">
                  <CardImg top src={bckImage} alt="" />
                  <CardBody className="card-inner">
                    <CardTitle tag="h5">{name}</CardTitle>
                    <CardText>
                      {description}
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
