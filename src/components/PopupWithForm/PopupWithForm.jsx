function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit, isSend, isValid=true}) {
    return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
        <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
            <button className="popup__button-close" type="button" onClick={onClose}/>
            <h2 className="popup__title">{title}</h2>
            <form action="#" className="popup__form" name={name} noValidate="" onSubmit={onSubmit}> 
                {children} 
                <button type="submit" className={`popup__button popup__button-save ${isSend ? 'popup__button_loading' : ''} ${isValid ? '' : 'popup__button_disabled'}`}
                disabled={isSend}>
                    {isSend ? '' : titleButton || 'Сохранить'}
            </button>
            </form>
        </div>
    </div>
    )
}
export default PopupWithForm