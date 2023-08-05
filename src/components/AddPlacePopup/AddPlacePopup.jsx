import useFormValidation from "../../utils/useFormValidation.js"
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"

function AddPlacePopup({isOpen, onClose, onAddPlace, isSend}) {
    const {values, errors, isValid, isInputValid, handleChange, reset} = useFormValidation()
    function resetForClose() {
        onClose()
        reset()
    }
    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({title: values.title, link: values.link}, reset)
    
    }
    return(
    <PopupWithForm 
        name='popup-cards'
        title = 'Новое место'
        titleButton = 'Создать'
        isSend={isSend}
        isValid = {isValid}
        isOpen = {isOpen}
        onClose = {resetForClose}
        onSubmit={handleSubmit}
    >
        <input
        type="text"
        className={`popup__input popup__input_image_name ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`}
        id="title"
        placeholder="Название"
        name="title"
        minLength={2}
        maxLength={30}
        required
        value={values.title ? values.title : ''}
        disabled={isSend}
        onChange={handleChange}
        />
        <span className="popup__error popup__error_visible title-error">{errors.title}</span>
        <input
        type="url"
        className={`popup__input popup__input_link_image ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error'}`}
        id="link"
        placeholder="Ссылка на картинку"
        name="link"
        required
        value={values.link ? values.link : ''}
        disabled={isSend}
        onChange={handleChange}
        />
        <span className="popup__error popup__error_visible link-error">{errors.link}</span>
    </PopupWithForm>
    )
}
export default AddPlacePopup