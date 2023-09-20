import {Card, CardMedia, CardContent,Stack, Box, Typography, Button, useTheme } from "@mui/material";
import {useHistory} from "react-router-dom";
import React, {useState, useRef, useEffect} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useDispatch, useSelector} from "react-redux";
import {setBusiness, setUser} from "../../store/state/userInfo";
import {IMG_STORAGE_BASE_URL} from "../../config";
import {CardTitle} from "reactstrap";
import approvedImg from "../../assets/images/rider-approved.jpg";
import pendingImg from "../../assets/images/rider-pending.jpg";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RiderCategoryCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userInfo)
  const [favColor, setFavColor] = useState("white");
  const { id, approved, restLogo, description, delivery, type, location, priceCategory, startingPrice, tableData } = props;
  let bckImage = approved? approvedImg : pendingImg;

  useEffect(()=>{
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    dispatch(setUser(user));
    if(user.busines){
      dispatch(setBusiness(user.busines));
    }
    // setUser(user)
  },[user])

  const handleCardClick = (e) => {
    console.log(history)
      if(approved){
          const data = tableData.filter((t)=> t.user_status == "Approved")
          history.push({
              pathname: '/riders/approved',
              state: { tableData: data },
          });
          // history.push(`${process.env.PUBLIC_URL}/riders/approved`);
      }
      else
      {
          const data = tableData.filter((t)=> t.user_status == "Pending")
          history.push({
              pathname: '/riders/pending',
              state: { tableData: data },
          });

      }
  };

  const handleFavoriteIconClick = (e) => {
    e.stopPropagation();
    if(favColor === 'white'){
      setFavColor("red")
    }
    else
      setFavColor("white")
  };


  return(
      // Card Starts here
      // <Col lg="4">
      <Card className="pointer-on-hover" onClick={handleCardClick}
            sx={{ maxWidth: 220,
              minWidth: 220,
              borderRadius: "5px"}}>
        <CardMedia sx={{
          height: 180,
          // background: "linear-gradient(to right top, #051937, #003656, #005671, #097787, #3a9998)",
        }}
                   image={bckImage}
        >

          {
            user.role !== "super-admin" &&
            <CardContent sx={{
              color: favColor,
              opacity: favColor === 'white' ? "50%" : "100%",
              textAlign: "right",
            }}>
              <FavoriteIcon className="pointer-on-hover" onClick={handleFavoriteIconClick}/>
            </CardContent>
          }
        </CardMedia>

        {/*Card Content / Text Area*/}
        <CardContent height="100%"
                     sx={{
                       // border: "2px solid orange",
                       borderTop: "none",
                       borderRadius: "0px 0px 25px 25px",
                       padding: "15px 25px 15px 25px !important",
                     }}>
          {/* name of rest... */}
          {/*<CardTitle tag="h5">{name}</CardTitle>*/}


          {/* delivery time & See menu button */}
          <Stack direction="row"
                 sx={{
                   // justifyContent: "space-between",
                   // alignItems: "center"
                 }}>

              {/* cuisine types section*/}
              <Box sx={{
                width: "100%"
            }}>
                <Typography gutterBottom sx={{
                  // paddingBottom: "0.5rem",
                  fontSize: "18px",
                  color: "black",
                    textAlign: "center"
                }}>
                    {approved? "Approved Riders" : "Pending Approval"}
                </Typography>
            </Box>

              {/*delivery time section*/}
              {/*<Box sx={{*/}
              {/*    width: "50%",*/}
              {/*}}>*/}
              {/*    <Stack direction="row" sx={{*/}
              {/*        justifyContent: "right"*/}
              {/*    }}>*/}
              {/*        <AccessTimeIcon sx={{*/}
              {/*            fontSize: "20px",*/}
              {/*            marginRight: "2px"*/}
              {/*        }}/>*/}
              {/*        <Typography gutterBottom*/}
              {/*                    sx={{*/}
              {/*                        textAlign: "left",*/}
              {/*                        bottom: "0",*/}
              {/*                        fontSize: "14px",*/}
              {/*                    }}>*/}
              {/*            {delivery? delivery : "15-20 min"}*/}
              {/*        </Typography>*/}
              {/*    </Stack>*/}
              {/*</Box>*/}
          </Stack>


          {/* Restaturant Type: Non-Veg & Price Category */}
          {user.role !== "super-admin" &&
          <Stack direction="row"
                 sx={{
                   padding: "0.5rem",
                   justifyContent: "right",
                   alignItems: "center"}}>
            <Typography sx={{
              color: "#fa4f26",
            }}>
              {priceCategory? priceCategory : "$$$"}
            </Typography>

          </Stack>
          }

        </CardContent>
        {/*Card Content / Text Area Ends */}

      </Card>

      // </Col>
  )
}

export default RiderCategoryCard;
