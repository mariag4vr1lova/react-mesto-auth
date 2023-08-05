import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation.js"
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSend}) {
    const input = useRef()
    const {values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()
    function resetForClose() {
        onClose()
        reset()
    }
    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({avatar: input.current.value}, reset)
    
    }
    return (
    <PopupWithForm 
        name='popup-edit-avata'
        title = 'Обновить аватар'
        isValid = {isValid}
        isOpen = {isOpen}
        onClose = {resetForClose}
        onSubmit={handleSubmit}
    >
        <input
        ref={input}
        type="url"
        className={`popup__input popup__input_avatar_link ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_type_error'}`}
        id="avatar"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
        value={values.avatar ? values.avatar : ''}
        disabled={isSend}
        onChange={handleChange}
        />
        <span className="popup__error popup__error_visible avatar-error">{errors.avatar}</span>
    </PopupWithForm>
    )
}
export default EditAvatarPopup