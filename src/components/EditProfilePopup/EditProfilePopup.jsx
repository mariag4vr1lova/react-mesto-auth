import { useContext, useEffect } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import useFormValidation from "../../utils/useFormValidation.js"
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"

function EditProfilePopup({isOpen, onClose, onUpdateUser, isSend}) {
    const currentUser = useContext(CurrentUserContext)
    const {values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
        setValue("username", currentUser.name)
        setValue("subtitle", currentUser.about)
    }, [currentUser, setValue])

    function resetForClose() {
        onClose()
        reset({username: currentUser.name, subtitle: currentUser.about})
    }
    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({username: values.username, subtitle: values.subtitle}, reset)
    
    }
    return (
    <PopupWithForm 
        name='popup-profile'
        title = 'Редактировать профиль'
        isOpen = {isOpen}
        onClose = {resetForClose}
        isValid = {isValid}
        isSend = {isSend}
        onSubmit = {handleSubmit}
    >
    <input
        id="input-username"
        type="text"
        className={`popup__input popup__input_user_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_type_error'}`}
        placeholder="Ваше имя"
        name="username"
        minLength={2}
        maxLength={40}
        required
        value={values.username ? values.username : ''}
        disabled={isSend}
        onChange={handleChange}
    />
    <span className="popup__error popup__error_visible input-username-error">{errors.username}</span>
    <input
        id="input-subtitle"
        type="text"
        className={`popup__input popup__input_user_text ${isInputValid.subtitle === undefined || isInputValid.subtitle ? '' : 'popup__input_type_error'}`}
        placeholder="О себе"
        name="subtitle"
        minLength={2}
        maxLength={200}
        required
        value={values.subtitle ? values.subtitle : ''}
        disabled={isSend}
        onChange={handleChange}
    />
    <span className="popup__error popup__error_visible input-subtitle-error">{errors.subtitle}</span>
    </PopupWithForm>
    )
}
export default EditProfilePopup