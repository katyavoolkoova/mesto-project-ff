const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); //находим открытый попап
    closeModal(popup); //закрываем открытый попап
  }
};

//открытие попапа и добавление слушателя на кнопку закрытия
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
};

//закрытие попапа и удаление слушателя на кнопку закрытия
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
};

//добавление слушателей на попапы
const hangListeners = (element) => {
  const popupCloseButton = element.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => {
    closeModal(element);
});

  element.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(element);
    }
  });
};

export { openModal, closeModal, hangListeners };