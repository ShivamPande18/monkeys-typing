import React from 'react'
import Navbar from '../components/navbar/Navbar'
import TypeArea from '../components/typearea/TypeArea'
import app from '../FirebaseConfig'
import { useState, useEffect } from "react"
import { child, get, getDatabase, onDisconnect, onValue, ref, update } from 'firebase/database'
import { getAuth } from "firebase/auth";
import SearchPage from './search/SearchPage'
import ResultPage from './Result/ResultPage'
import "./type.css"

function TypePage({ host, uid }) {

    const [mScore, setMScore] = useState(0)
    const [oScore, setOScore] = useState(0)
    const [sec, setSec] = useState(15)

    const [matched, setMatched] = useState(false)
    const [over, setOver] = useState(false)
    var res = 0
    const auth = getAuth()

    var timer;

    useEffect(() => {
        const db = getDatabase(app)
        const playerRef = ref(db, "players")
        // console.log("this use eff")

        onValue(playerRef, (snapshot) => {
            const data = snapshot.val()

            if (!matched) {
                // console.log("! matched")
                if (host) {
                    // console.log("! matched + host")
                    Object.entries(data).map((player) => {
                        if (auth.currentUser.uid == player[0] && player[1]['oid'] != "") {
                            setMatched(true)
                        }
                    })
                }
                else {
                    // console.log("! matched + ! host")
                    setMatched(true)
                }
            }
            else {
                // console.log("matched")

                timer = setInterval(() => {
                    setSec(sec - 1);

                    if (sec <= 0) {
                        let id;
                        if (host) id = auth.currentUser.uid
                        else id = uid
                        get(child(ref(db), 'players/' + uid)).then((snapshot) => {
                            const data = snapshot.val()
                            const cnt = data['wordCnt']
                            const ocnt = data['owordCnt']
                            console.log(cnt)
                            console.log(ocnt)
                            if (host) {
                                if (cnt > ocnt) res = 1
                                else if (cnt == ocnt) res = 0
                                else res = -1
                            }
                            else {
                                if (ocnt > cnt) res = 1
                                else if (ocnt == cnt) res = 0
                                else res = -1
                            }
                        })

                        setOver(true)
                    }

                }, 1000)


                if (host) {
                    // console.log("matched + host")
                    const data = snapshot.val()
                    // console.log(data)
                    Object.entries(data).map((player) => {
                        if (auth.currentUser.uid == player[0]) {
                            setOScore(player[1]["owordCnt"]);
                        }
                    })
                }
                else {
                    console.log("matched + ! host")
                    const data = snapshot.val()
                    Object.entries(data).map((player) => {
                        if (uid == player[0]) {
                            setOScore(player[1]["wordCnt"]);
                        }
                    })
                }
            }

        })



        const user = auth.currentUser["uid"]
        const pRef = ref(db, "players/" + user)
        onDisconnect(pRef).remove().catch((err) => {
            if (err) {
                console.log(err)
            }
        })

        // return () => clearInterval(timer)
    }, [matched, setMatched, sec, setSec])

    function setMyScore() {
        const user = host ? auth.currentUser["uid"] : uid
        const db = getDatabase(app)
        const pRef = ref(db, 'players/' + user)

        if (host) {
            update(pRef, {
                wordCnt: mScore + 1
            })
        }
        else {
            update(pRef, {
                owordCnt: mScore + 1
            })
        }
        // set(pRef, {
        //     id: user,
        //     name: genName(),
        //     wordCnt: mScore + 1
        // })
        setMScore(mScore + 1)
    }

    function renderPage() {

        if (over) {
            return <ResultPage res={res} />
        }
        else {
            if (matched) return <TypeArea mScore={mScore} setMyScore={setMyScore} oScore={oScore} />
            else return <SearchPage />
        }
    }


    return (
        <div className='typePage'>
            <Navbar />
            {over ? <></> : <h1 className='timer'>Time Left = {sec}</h1>}
            {renderPage()}


            {/* <TypeArea mScore={mScore} setMScore={setMScore} oScore={oScore} /> */}
        </div>
    )
}

export default TypePage