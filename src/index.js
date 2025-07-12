import "./components/pages/index.css";
import { initialCards } from "./components/scripts/cards.js";
import {
  openModal,
  closeModal,
  hangListeners,
} from "./components/scripts/modal.js";
import { createCard, deleteCard, likeCard } from "./components/scripts/card.js";

const placesList = document.querySelector(".places__list");
const profileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

const cardNameInput = newPlaceForm.elements["place-name"];
const cardLinkInput = newPlaceForm.elements.link;

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupImageCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

initialCards.forEach(function (item) {
  const cards = createCard(item, {
    removeNodeCallback: deleteCard,
    likeCardCallback: likeCard,
    handleOpenImageCallback: handleOpenImage,
  });
  placesList.append(cards);
});

hangListeners(popupTypeNewCard);
hangListeners(popupTypeEdit);
hangListeners(popupTypeImage);

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  newPlaceForm.reset();
  openModal(popupTypeNewCard);
});

function handleOpenImage({ name, link }) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openModal(popupTypeImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = profileNameInput.value;
  const job = profileDescriptionInput.value;
  profileName.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupTypeEdit);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const addNewCard = createCard(newCard, {
    removeNodeCallback: deleteCard,
    likeCardCallback: likeCard,
    handleOpenImageCallback: handleOpenImage,
  });
  placesList.prepend(addNewCard);
  closeModal(popupTypeNewCard);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

newPlaceForm.addEventListener("submit", handleFormNewCardSubmit);
