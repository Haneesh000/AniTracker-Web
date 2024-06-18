import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {InputGroup, Form, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function Nav() {
    const [width, setWidth] = React.useState(window.innerWidth);
    const searchBar = React.createRef();

    React.useEffect(() => {
        setWidth(window.innerWidth);
    }, [window.innerWidth]);

    async function handleSearch() {
        if(searchBar.current.value === "" || searchBar.current.value === null || searchBar.current.value === undefined) {
            alert("Please enter a search query.");
            return;
        }
        window.location.href = "/search?q=" + searchBar.current.value;
    }

    return (
        <>
            <Navbar className="bg-body-secondary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/icons/icon128.jpg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            style={{
                                borderRadius: "50%",
                                marginRight: "10px",
                            }}
                        />{' '}
                        AniTracker
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <InputGroup className="mb-3">
                                {
                                    width <= 550 ?
                                        <InputGroup.Text>
                                            <a href="/search">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </a>
                                        </InputGroup.Text> :
                                        <>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </InputGroup.Text>
                                            <Form.Control aria-label="Search anime" ref={searchBar} placeholder="Search anime..." />
                                            <Button variant="primary" onClick={handleSearch} style={{color: "#fff"}}>
                                                Search
                                            </Button>
                                        </>
                                }
                            </InputGroup>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Nav;