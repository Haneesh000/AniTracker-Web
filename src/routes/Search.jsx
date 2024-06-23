import React from "react";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faPlus} from "@fortawesome/free-solid-svg-icons";

function Search() {
    const params = new URLSearchParams(window.location.search);
    const [searchResults, setSearchResults] = React.useState([]);

    React.useEffect(() => {
        if(params.has("q")) {
            console.log("Search query:", params.get("q"));
        }
        (async () => {
            await fetch("https://api.jikan.moe/v4/anime?q="+params.get("q"))
                .then(res => res.json())
                .then(resData => {
                    const temp = [];
                    resData.data.forEach(anime => {
                        temp.push(anime);
                    });
                    setSearchResults(temp);
                });
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

    console.log(searchResults)

    return <div>
        <Container>
            <h3>Search Query: {params.get("q")}</h3>
            <hr/>
            {
                searchResults.map((anime, index) => {
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
                                <Button variant="primary" style={{marginRight: "0.3rem"}} onClick={(e) => {
                                    const prevArr = JSON.parse(window.localStorage.getItem("favourites"));
                                    let current = [];
                                    if(prevArr === null || prevArr === undefined || prevArr.length === 0)
                                        current = JSON.stringify([Number(anime.mal_id)]);
                                    else
                                        current = JSON.stringify([...prevArr, Number(anime.mal_id)]);
                                    window.localStorage.setItem("favourite", current);
                                    alert("Added to favourites!");
                                }}>
                                    <FontAwesomeIcon icon={faHeart} /> Favourite
                                </Button>
                                <Button variant="primary"><FontAwesomeIcon icon={faPlus} /> Watchlist</Button>
                            </div>
                        </div>
                    </div>;
                })
            }
        </Container>
    </div>;
}

export default Search;
