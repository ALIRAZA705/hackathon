import {Card, CardMedia, CardContent,Stack, Box, Typography, Button, useTheme } from "@mui/material";
import {useHistory} from "react-router-dom";
import React, {useState, useRef, useEffect} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

const RestaurantCardMaterial = (props) => {
    const history = useHistory();

    const [favColor, setFavColor] = useState("white");
    const {name, restLogo, description, delivery, type, location, priceCategory, rating } = props;
    let bckImage = restLogo? restLogo : "https://burgerlab.com.pk/wp-content/uploads/2022/02/Untitled-1-1-1.jpg?c062ef&c062ef"


    const handleCardClick = (e) => {
        console.log(history)
         history.push(`${process.env.PUBLIC_URL}/menu`);
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
                sx={{ maxWidth: 265,
                minWidth: 265,
                borderRadius: "25px"}}>
                <CardMedia sx={{
                    height: 180,
                    // background: "linear-gradient(to right top, #051937, #003656, #005671, #097787, #3a9998)",
                }}
                           image={bckImage}
                >

                    <CardContent sx={{
                        color: favColor,
                        opacity: favColor === 'white'? "50%" : "100%",
                        textAlign: "right"
                    }}>
                        <FavoriteIcon className="pointer-on-hover" onClick={handleFavoriteIconClick} />
                    </CardContent>
                </CardMedia>

                {/*Card Content / Text Area*/}
                <CardContent height="100%"
                             sx={{
                                 border: "2px solid orange",
                                 borderTop: "none",
                                 borderRadius: "0px 0px 25px 25px",
                                 padding: "5px 10px 5px 10px !important",
                             }}>
                    {/* name of rest... */}
                    <Typography gutterBottom variant="h6" component="div" noWrap="true" sx={{
                        color: "#fa4f26",
                    }}>
                        {name? name : "Thai Famous Cuisine"}
                    </Typography>


                    {/* delivery time & See menu button */}
                    <Stack direction="row"
                           sx={{
                               justifyContent: "space-between",
                               alignItems: "center"
                           }}>
                        <Box>
                            <Stack direction="row">
                            {/*    <AccessTimeIcon/>*/}
                                <Typography gutterBottom sx={{
                                    fontSize: "14px",
                                    color: "#8A8A8A"
                                }}>
                                    North Indian . Indian . Pure Veg
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    {/* Restaturant Type: Non-Veg & Price Category */}
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

                </CardContent>
                {/*Card Content / Text Area Ends */}

            </Card>

        // </Col>
    )
}

export default RestaurantCardMaterial;