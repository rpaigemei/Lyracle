import React, {useState} from "react";
import { motion } from "framer-motion";
import { fetchTracks } from "./api/lastFM";
import Card from "./components/card";
import lyracle from "./assets/images/lyracleIcon.png"

const apiKEY = process.env.REACT_APP_API_KEY;

function Lyracle() {
    const [shuffled, setShuffled] = useState(false);
    const [cards, setCards] = useState([]);
    const [keyChange, setKeyChange] = useState(0);

    // shuffle() was developed with the help of AI

    // function to fetch & shuffle 3 songs
    async function shuffle() {
        try {
            // calls fetchTracks from lastFM.js
            const tracks = await fetchTracks(apiKEY, 100);

            // if no tracks come back, sets error
            if (!tracks || tracks.length === 0) {
                console.log('no tracks returned. try a different tag or check your api key');
                setCards([]);
                return;
            }

            // shallow copy of tracks array using slice()
            const arr = tracks.slice();
            
            // chance operation - random computer algorithm
                // uses the fisher-yates shuffle to randomize array & ensure every track has equal chance of being chosen
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            // adds 3 songs to selected[]
            const selected = [];
            const seen = new Set(); // prevent duplicate songs

            // loops through shuffled tracks, selects only 3 songs
            for (let i = 0; i <arr.length && selected.length < 3; i++) {
                const t = arr[i];
                const key = `${t.title} - ${t.artist}`;
                // if the song has not been seen, it's added
                if (!seen.has(key)) {
                    seen.add(key);
                    selected.push(t);
                }
            }
            
            // defines the tarot card positions: past, present, future
            const positions = ['past', 'present', 'future'];
            // prepends positions to song array
            const cardObjs = selected.map((t, i) => ({ position: positions[i], ...t }));
            setCards(cardObjs);

            setShuffled(true);
            setKeyChange(k => k + 1);
        }
        catch (err) {
            console.error(err);
            setCards([]);
        }
    }

    function restartShuffle() {
        setShuffled(false);
    }

    return (
        <div className='lyracle'>
            {shuffled ? <div className="shuffled">
                    <div className="cards">
                        {cards.map((c, i) => (
                            <div className="result">
                                <div className="position">
                                    {c.position.toUpperCase()}
                                </div>

                                <motion.div
                                    key={`${i} - ${keyChange}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: i*0.2 }}
                                >
                                    <Card position={c.position} title={c.title} artist={c.artist} link={c.link} />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                <div className="buttons">
                    <div onClick={shuffle} className="button">
                        RE-SHUFFLE
                    </div>
                    <div onClick={() => restartShuffle()} className="button">
                        BACK TO HOME
                    </div>
                </div>
            </div> : <div className="landing">
                <div className="card" onClick={shuffle} id="middle">
                    <div className="label" id="name">
                        LYRACLE
                    </div>

                    <img src={lyracle} className="image" alt="lyrical symbol" />
                    
                    <div className="label" id="instructions">
                        CLICK TO SHUFFLE
                    </div>
                </div>
                <div className="card" onClick={shuffle} id="left">
                    <div className="label" id="name">
                        LYRACLE
                    </div>

                    <img src={lyracle} className="image" alt="lyrical symbol" />
                    
                    <div className="label" id="instructions">
                        CLICK TO SHUFFLE
                    </div>
                </div>
                <div className="card" onClick={shuffle} id="right">
                    <div className="label" id="name">
                        LYRACLE
                    </div>

                    <img src={lyracle} className="image" alt="lyrical symbol" />
                    
                    <div className="label" id="instructions">
                        CLICK TO SHUFFLE
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Lyracle;