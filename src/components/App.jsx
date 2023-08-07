import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { register, login, checkToken } from "../utils/auth.js";


function App() {
  const navigate = useNavigate();
  //стейты попапа
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false)
  //стейты контекста
  const [currentUser, setCurrentUser] = useState({});
  const [headerEmail, setHeaderEmail] = useState("");
  //стейты карточки
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState("");
//стейты для регистрации и логина
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getCards()])
        .then(([user, dataCard]) => {
          setCurrentUser({ ...currentUser, ...user });
          setCards(dataCard);
        })
        .catch((error) => console.error("Ошибка при загрузке начальных данных"`${error}`))
    }
  }, [loggedIn]);
  
  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res && res.data) {
          setIsInfoTooltipSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsResultPopupOpen(true));
  }
  
  function handleLogin(data) {
    login(data)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          navigate("/");
          setHeaderEmail(data.email);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        setIsInfoTooltipSuccess(false);
        setIsResultPopupOpen(true);
        console.error(`Ошибка при авторизации ${error}`)
      })
      .finally(() => setIsSend(false))
  }
  
  function logOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setHeaderEmail("");
  }  

  useEffect(() => {
    if (localStorage.jwt) {
      checkToken(localStorage.jwt)
      .then(res => {
        setHeaderEmail(res.data.email)
        setLoggedIn(true)
        navigate('/')
      })
      .catch(error => console.error("Ошибка авторизации при повторном входе"`${error}`))
    } else {
    setLoggedIn(false)
    }
  }, [navigate])
  


function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
  setEventListenerEsc()
}

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
  setEventListenerEsc()
}

function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  setEventListenerEsc()
}

function handleDeleteClick(cardId) {
  setDeleteCardId(cardId);
  setIsDeletePopupOpen(true);
  setEventListenerEsc()
}

function handleCardClick(card) {
  setSelectedCard(card);
  setIsImagePopup(true);
  setEventListenerEsc()
}

const setAllCloseStates = useCallback (() => {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setIsImagePopup(false);
  setIsDeletePopupOpen(false);
  setIsResultPopupOpen(false);
  setSelectedCard({});
}, [])

const closePopupEsc = useCallback ((evt) => {
  if (evt.key === 'Escape') {
    setAllCloseStates()
    document.removeEventListener('keydown', closePopupEsc)
  }
},[setAllCloseStates])

const closeAllPopups = useCallback(() => {
  setAllCloseStates()
  document.removeEventListener('keydown', closePopupEsc)
}, [setAllCloseStates, closePopupEsc])

function setEventListenerEsc() {
  document.addEventListener('keydown', closePopupEsc)
}
function handleCardDelete(evt) {
  evt.preventDefault();
  setIsSend(true);
  api
    .deleteCard(deleteCardId)
    .then(() => {
      setCards(
        cards.filter(card => {
          return card._id !== deleteCardId
        })
      );
      closeAllPopups();
    })
    .catch((error) => console.error("Ошибка при удалении карточки"`${error}`))
    .finally(() => setIsSend(false));
}
function handleUpdateUser(dataUser, reset) {
  setIsSend(true);
  api
    .setUserInfo(dataUser)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
    })
    .catch((error) =>
      console.error("Ошибка при редактировании профиля"`${error}`)
    )
    .finally(() => setIsSend(false));
}
function handleUpdateAvatar(dataUser, reset) {
  setIsSend(true);
  api.setNewAvatar(dataUser)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
    })
    .catch((error) =>
      console.error("Ошибка при редактировании ававтара"`${error}`)
    )
    .finally(() => setIsSend(false));
}
function handleAddPlaceSubmit(dataCard, reset) {
  setIsSend(true);
  api
    .addCard(dataCard)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
      reset();
    })
    .catch((error) =>
      console.error("Ошибка при добавлении карточки"`${error}`)
    )
    .finally(() => setIsSend(false));
}


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
      <Header loggedIn={loggedIn} email={headerEmail} logOut={logOut} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onDelete={handleDeleteClick}
                isLoading={isLoadingCards}
                cards={cards}
              
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <PopupWithForm
          name="popup-delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isSend={isSend}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name="tooltip"
          isOpen={isResultPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isInfoTooltipSuccess}
        />
        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
