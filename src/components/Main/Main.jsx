import { useContext } from "react"
import Card from "../Card/Card.jsx"
import CurrentUserContext from  "../../contexts/CurrentUserContext"
import Spinner from "../Spinner/Spinner.jsx"

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, isLoading}) {
    const currentUser = useContext(CurrentUserContext)


    return(
    <main className="content">
        <section className="profile">
            <div className="profile__container">
                <button className="profile__avatar-overlay" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар пользователя" />
                </button>
            </div>
            <div className="profile__info">
                <div className="profile__personal-info">
                    <h1 className="profile__title"> {currentUser.name ? currentUser.name : ''} </h1>
                    <button
                        className="profile__edit-button hover-animation"
                        type="button"
                        aria-label="Редактировать"
                        onClick={onEditProfile}
                    />
                </div>
                <p className="profile__subtitle"> {currentUser.about ? currentUser.about : ''} </p>
            </div>
            <button className="profile__add-button hover-animation" type="button" onClick={onAddPlace}/>
        </section>
        <section>
            <ul className="elements">
                {isLoading ? <Spinner/> : cards.map(data => {
                return(
                    <li className="element" key = {data._id}>
                    <Card card = {data} onCardClick= {onCardClick} onDelete = {onDelete}/> 
                    </li>
                    )
                }) }
            </ul>
        </section>
    </main>
    )
}
export default Main