import { useEffect, useState } from "react"
import api from "../../utils/api.js"

function ButtonLike({likes, myid, cardid}) {
    const[isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)
    useEffect( () => {
        setIsLike(likes.some (element => myid === element._id))
    }, [likes, myid])
    function handelLike() {
        if (isLike){
            api.deleteLike(cardid)
            .then(res => {
                setIsLike(false)
                setCount(res.likes.length)
            })
            .catch((error => console.error('Ошибка при снятии лайка' `${error}`)))
        } else {
            api.addLike(cardid)
            .then(res => {
                setIsLike(true)
                setCount(res.likes.length)
            })
            .catch((error => console.error('Ошибка при установке лайка' `${error}`)))
        }
    }
    return(
    <div className="element__like-container">
        <button className={`element__like ${isLike ? 'element__like_active' : ''}`} aria-label="Лайк" type="button" onClick={handelLike}/>
        <p className="element__counter"> {count} </p>          
    </div>
    )
}
export default ButtonLike
