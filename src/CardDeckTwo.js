import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const CardDeckTwo = () => {
    const [deck, setDeck] = useState(null)
    const [card, setCard] = useState(null)
    const [toggle, setToggle] = useState(false)
    const timerRef = useRef(null);
    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/");
            setDeck(deckResult.data.deck_id)
        }
        fetchDeck();
    }, [])

  
//used solution for help, would like to go over in session
    useEffect(() => {
        async function getCard() {
          
                const cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/`)
                setCard(cardRes.data.cards[0].image)
           
                if (cardRes.data.remaining === 0) {
                    setToggle(false)
                    alert("No more cards left")
                }

        }
        

        if (toggle && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await getCard();
            }, 1000)
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
          };

    }, [toggle, setToggle, deck])


    function toggleFunc() {
        setToggle(toggle => !toggle)
    }

    return (
        <>
        <div>{deck ? <button onClick={toggleFunc}>Draw/Stop cards</button> : <i>Loading...</i>}</div>
        <img src={card}></img>
        </>
    )
}

export default CardDeckTwo; 