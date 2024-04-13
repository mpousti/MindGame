import './solocard.css'

const SoloCard = ({card, handlePicks, flipped, disabled}) => {

    const handleChoice = () => {
        if (!disabled) {
            handlePicks(card)
        }
    }

    return  (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="show cards"/>
                <img className="back" src="img/cover.png" alt="cover card" onClick={handleChoice} />
            </div>
        </div>
)}

export default SoloCard