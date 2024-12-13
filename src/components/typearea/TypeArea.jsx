import React from 'react'
import "./typearea.css"
import { useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"


function TypeArea({ mScore, setMyScore, oScore }) {

    gsap.registerPlugin(useGSAP);

    const words = [
        "hello",
        "hi",
        "sweet",
        "technology",
        "draft",
        "drum",
        "whip",
        "zone",
        "square",
        "ignore",
        "trunk",
        "swipe",
        "blank",
        "difference",
        "command",
        "lamp",
        "hike",
        "twist",
        "artificial",
        "mouth",
        "mistreat",
        "governor",
        "error",
        "share",
        "passion",
        "confrontation",
        "get",
        "replace",
        "report",
        "practice",
        "occupation",
        "throat",
        "guide",
        "estimate",
        "marketing",
        "open",
        "date",
        "weapon",
        "executive",
        "well",
        "sample",
        "feminist",
        "rich",
        "wife",
        "get",
        "freedom",
        "casualty",
        "consumer",
        "hello",
        "hi",
        "sweet",
        "technology",
        "draft",
        "drum",
        "whip",
        "zone",
        "square",
        "ignore",
        "trunk",
        "swipe",
        "blank",
        "difference",
        "command",
        "lamp",
        "hike",
        "twist",
        "artificial",
        "mouth",
        "mistreat",
        "governor",
        "error",
        "share",
        "passion",
        "confrontation",
        "get",
        "replace",
        "report",
        "practice",
        "occupation",
        "throat",
        "guide",
        "estimate",
        "marketing",
        "open",
        "date",
        "weapon",
        "executive",
        "well",
        "sample",
        "feminist",
        "rich",
        "wife",
        "get",
        "freedom",
        "casualty",
        "consumer",
    ]


    function genText(len) {
        const lim = words.length
        let str = ""
        for (let i = 0; i < len; i++) {
            str += words[Math.floor(Math.random() * lim)] + " "
        }
        return str
    }

    var txtLen = 30



    const [data, setData] = useState(genText(txtLen))

    const [ind, setInd] = useState(0)
    const [word, setWord] = useState(0)
    const [col, setCol] = useState("#646669")




    useGSAP(() => {
        gsap.to(".after", {
            color: col,
            duration: 0.2,
            yoyo: true
        })
    }, [col])


    const escFunction = (e) => {
        let inp = e.key
        if (inp == data[ind]) {

            setInd(ind + 1)

            if (inp == " ") {
                setMyScore()
                setWord(word + 1)
                if (word >= txtLen - 1) {
                    setInd(0)
                    setWord(0)
                    setData(genText(txtLen))
                }
            }
            console.log(ind)

            // if (data[ind + 1] == " ") {
            //     console.log("sad")
            //     setData(data.substring(0, ind + 1) + '_' + data.substring(ind + 2));
            //     // data[ind + 1] = "_"
            // }


            setCol("#646669")
        }
        else {
            setCol("#ca4754")
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);






    return (
        <div className='typeArea'>
            <div className="countCont">
                <p>{mScore}</p>
                <p>vs</p>
                <p>{oScore}</p>
            </div>
            <p>
                <span style={{ color: "var(--fg-yellow)" }}>{data.slice(0, ind)}</span>
                <span className='after'>{data.slice(ind)}</span>
            </p>

            {/* 
            <div id="caret" class="full-width default hidden" style="animation-name: caretFlashSmooth; opacity: 1; font-size: 2rem; display: block; top: 5.5px; left: 8.5px;"></div> */}




        </div >
    )
}

export default TypeArea