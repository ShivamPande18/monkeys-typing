import './App.css';
import TypePage from './pages/TypePage';
import LoginPage from './pages/login/LoginPage';
import { useState } from "react"
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, set, onValue, update, get, child } from "firebase/database"
import app from "./FirebaseConfig"
import TypeArea from './components/typearea/TypeArea';

function App() {


  const auth = getAuth()
  const db = getDatabase(app)
  const [host, setHost] = useState(false)
  const [uid, setUid] = useState("")


  const [logged, setLogged] = useState(false)
  let user = ""

  function genName() {
    let name = "player";
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);
    name += Math.floor(Math.random() * 9);

    return name;
  }

  function onLogin() {
    signInAnonymously(auth)
      .then(() => {
        // user = (auth.currentUser)
        user = auth.currentUser["uid"]
        createJoin(user)

        // set(playerRef, {
        //   id: user,
        //   name: genName(),
        //   wordCnt: 0,
        //   oid: "",
        //   oname: "",
        //   owordCnt: 0
        // })
        // setLogged(true)


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  function createPlayer(playerRef) {
    set(playerRef, {
      id: user,
      name: genName(),
      wordCnt: 0,
      oid: "",
      oname: "",
      owordCnt: 0,
      time: 15,
    })
  }

  async function createJoin(user) {
    console.log("creating")
    const playerRef = ref(db, 'players/' + user)
    const playersRef = ref(db, 'players')


    get(child(ref(db), `players`)).then((snapshot) => {

      if (snapshot.exists()) {

        let data = snapshot.val()
        let needNew = true;

        Object.entries(data).map((player) => {
          if (player[1]["oid"] == "" && needNew) {
            needNew = false;
            const pRef = ref(db, 'players/' + player[0])
            setUid(player[0])
            update(pRef, {
              oid: auth.currentUser["uid"],
              oname: genName(),
            })
            console.log("hua")
          }
        })

        if (needNew) createPlayer(playerRef)

        setHost(false)
        setLogged(true)
      }
      else {
        console.log("asdasd")
        createPlayer(playerRef)
        setUid(user)
        setHost(true)
        setLogged(true)
      }

    })
  }



  return (

    <div className="App">
      {/* <TypeArea mScore={0} setMyScore={() => console.log()} oScore={0} /> */}
      {
        logged ? <TypePage host={host} uid={uid} /> : <LoginPage onLogin={onLogin} />
      }
    </div>
  );
}

export default App;