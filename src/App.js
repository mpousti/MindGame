import { useEffect, useState } from 'react';
import './App.css';
import SoloCard from './components/SoloCard';
import { Button } from 'antd';



const cardImages = [
  {"src": "img/card1.png", matched: false},
  {"src": "img/card2.png", matched: false},
  {"src": "img/card3.png", matched: false},
  {"src": "img/card4.png", matched: false},
  {"src": "img/card5.png", matched: false},
  {"src": "img/card6.png", matched: false},
  {"src": "img/card7.png", matched: false},
  {"src": "img/card8.png", matched: false},
  {"src": "img/card9.png", matched: false},
  {"src": "img/card10.png", matched: false}
]


function App() {

  const  [cards, setCards] = useState([]);
  const [turn,setTurn] = useState(0);
  const [firstPick,  setFirstPick] = useState(null) ;
  const  [secondPick, setSecondPick] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurn(0)
  };

  const handlePicks = (card)=>{
    firstPick ? setSecondPick(card) : setFirstPick(card)
  }
  useEffect(() => {
    if(firstPick && secondPick){

      setDisabled(true)

      if (firstPick.src === secondPick.src ) {
        setCards(prevCards => {
          return (prevCards.map(card => {
            if (card.src === firstPick.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          }))
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [firstPick, secondPick])

  useEffect(() => {
    shuffleCards()
  }, [])
  


  const resetTurn = () => {
    setFirstPick(null)
    setSecondPick(null)
    setTurn((prev) => prev + 1)
    setDisabled(false)
  }  

  return (
    <div className="App">
      <div className='flex-top'>
      <h1> Mind Game</h1>
      
        <Button type='default' shape='round' size='large' align='center' onClick={shuffleCards} ghost>New game!</Button>
        <h2>Turns: {turn} </h2>
      </div>
       <div>
          <p className='explanation'> How to play: Click on two boxes at a time to find the matched pics!</p>
        </div>
        <div className='mid'>   
        <div className='card-grid'>{cards.map(item => (

          <SoloCard card={item} key={item.id}
            handlePicks={handlePicks}
            disabled={disabled}
            flipped={item === firstPick || item === secondPick || item.matched}
          />
          ))}

        </div>
        
        </div>  
    </div>
  );
  
}

export default App;
