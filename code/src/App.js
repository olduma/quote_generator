import './App.css';
import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Quote = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            const { content, author } = data;
            setAuthor(author);
            setQuote(content);
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    const tweetQuote = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
        window.open(twitterUrl, "_blank");
    }

    return (
        <Container id="quote-box">
            <div id="text">
                "{quote}"
            </div>
            <div id="author">
                - {author}
            </div>
            <div>
                <a
                    id="tweet-quote"
                    href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button color="primary" variant="text" onClick={tweetQuote}>
                        <FontAwesomeIcon icon={faTwitter} size={"2xl"} color="white"/>
                    </Button>
                </a>
                <Button color="secondary" variant="contained" id="new-quote" onClick={fetchQuote}>
                    New Quote
                </Button>
            </div>
        </Container>
    );
}

function App() {
    return (
        <div className="app">
            <Quote />
        </div>
    );
}

export default App;
