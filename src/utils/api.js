class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
      this._authorization = options.headers.authorization;
    }
    _checkRes(res) {return res.ok ? res.json() : Promise.reject}
    
    getInfo() {
        return fetch(`${this._url}/users/me`,{
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._checkRes)
    }
    getCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
            authorization: this._authorization
        }
      })
      .then(this._checkRes)
    }
    setUserInfo(data) {
      return fetch(`${this._url}/users/me`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.username,
          about: data.subtitle,
        })
      })
      .then(this._checkRes)
    }
    setNewAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        })
      })
      .then(this._checkRes)
    }
    addCard(data) {
      return fetch (`${this._url}/cards`,{
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.title,
          link: data.link,
        })
      })
      .then(this._checkRes)
    }
  addLike(cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`,{
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkRes)
  }
  deleteLike(cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`,{
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkRes)
  }
  deleteCard(cardId) {
    return fetch (`${this._url}/cards/${cardId}`,{
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._checkRes)
  }
};
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
      headers: {
        authorization: 'b21358c1-1bff-4727-aebb-1dc71343be33',
        'Content-Type': 'application/json'
      }
})
export default api