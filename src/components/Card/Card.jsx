import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import ButtonLike from "../ButtonLike/ButtonLike.jsx"

function Card({card, onCardClick, onDelete}) {
    const currentUser = useContext(CurrentUserContext)
    return(
    //<li className="element">
    <article>
        {currentUser._id === card.owner._id && <button
            className="element__delete-button"
            aria-label="Удалить"
            type="button"
            onClick={()=> onDelete(card._id)}
        />}
        <img 
            className="element__image" 
            alt={`Изображение ${card.name}`} 
            src={card.link} 
            onClick={() => onCardClick({link: card.link, name: card.name})}/>
        <div className="element__block">
            <h2 className="element__title">{card.name}</h2>
            <ButtonLike likes ={card.likes} myid={currentUser._id} cardid={card._id}/>
        </div>
    {/*<button className="element__delete-button"aria-label="Удалить"type="button" onClick={onDelete} />*/}
    </article>
    //</li>

    )
}
export default Card