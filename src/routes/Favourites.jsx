import React from "react";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeartBroken, faPlus} from "@fortawesome/free-solid-svg-icons";

function Favourites() {
    const [favourites, setFavourites] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const userFavourites = JSON.parse(localStorage.getItem("favourites"));
            console.log(userFavourites)
            if (userFavourites === null || userFavourites === undefined || userFavourites === []) {
                setFavourites([]);
            } else {
                const favouritesArr = [];
                for(const id of userFavourites) {
                    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
                    const data = await response.json();
                    favouritesArr.push(data.data);
                }
                setFavourites(favouritesArr);
            }
        })();
    }, []);

    function calculateWidth() {
        let minWidth = 506;
        let maxWidth = 1536;
        let minPercentage = 45;
        let maxPercentage = 20;

        let currentWidth = window.innerWidth;

        // Ensure the current width is within the given range
        if (currentWidth < minWidth) {
            return minPercentage;
        } else if (currentWidth > maxWidth) {
            return maxPercentage;
        }

        // Calculate the percentage based on the current width
        let percentageWidth = minPercentage + (maxPercentage - minPercentage) * (currentWidth - minWidth) / (maxWidth - minWidth);

        return percentageWidth;
    }

    return (
        <div>
            <Container>
                <h3>Favourites</h3>
                <hr/>
                {
                    favourites.map((anime, index) => {
                        return <div key={index} style={{
                            display: "flex",
                            marginBottom: "3rem",
                            border: "1px solid #000",
                            padding: "2rem 2.5rem",
                            borderRadius: "50px",
                            overflowY: "scroll",
                            minHeight: "17rem",
                            maxHeight: "22rem",
                        }}>
                            {
                                anime.name
                            }
                            <div className="imageContainer" style={{minWidth: calculateWidth()+"%", width: "fit-content", maxWidth: "45%"}}>
                                <img
                                    style={{
                                        height: "12rem",
                                        marginRight: "2rem",
                                        borderRadius: "25px",
                                        position: "absolute",
                                    }}
                                    src={anime.images.jpg.image_url}
                                    alt={anime.title}
                                />
                            </div>
                            <div className="info" style={{
                                backgroundColor: "#fff",
                                zIndex: 5,
                                paddingLeft: "0.5rem"
                            }}>
                                <h4>{anime.title}</h4>
                                <p>{anime.synopsis}</p>
                                <div className="buttonsContainer" style={{
                                    display: "",
                                    justifyContent: "space-between",
                                    marginTop: "1rem"
                                }}>
                                    <Button variant="primary" style={{marginRight: "0.3rem"}} onClick={async (e) => {
                                        const prevArr = await JSON.parse(window.localStorage.getItem("favourites"));
                                        let current = [];
                                        prevArr.forEach((id) => {
                                            if(id !== anime.mal_id) {
                                                current.push(id);
                                            }
                                        });
                                        window.localStorage.setItem("favourites", JSON.stringify(current));
                                        alert("Removed from favourites!");
                                        window.location.reload();
                                    }}>
                                        <FontAwesomeIcon icon={faHeartBroken} /> Dislike
                                    </Button>
                                    <Button variant="primary"><FontAwesomeIcon icon={faPlus} /> Watchlist</Button>
                                </div>
                            </div>
                        </div>;
                    })
                }
            </Container>
        </div>
    );
}

export default Favourites;
