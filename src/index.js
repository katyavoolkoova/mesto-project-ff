import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';
import {
  openModal,
  closeModal,
  hangListeners
} from "../module.js";
import { createCard, deleteCard, likeCard } from "./card.js";




const placesList = document.querySelector(".places__list");



initialCards.forEach(function (item, ) {
  const cards = createCard(item, {
    removeNodeCallback: deleteCard, 
    likeCardCallback: likeCard,
    handleOpenImageCallback: handleOpenImage,
});
  placesList.append(cards);
});




const profileForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];

const cardFormSubmitButton = newPlaceForm.querySelector('.popup__button');
const cardNameInput = newPlaceForm.elements['place-name'];
const cardLinkInput = newPlaceForm.elements.link;

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupImage = popupTypeImage.querySelector('.popup__image');



const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;


/*const cardTitle = cardElement.querySelector('.card__title');
const cardDescription = cardElement.querySelector('.card__description');*/


hangListeners(popupTypeNewCard);
hangListeners(popupTypeEdit);
hangListeners(popupTypeImage);





profileEditButton.addEventListener("click", () => {
    profileForm.reset();
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

};


  function handleFormSubmit(evt) {
    evt.preventDefault();
        const name = profileNameInput.value;
        const job = profileDescriptionInput.value;
        profileName.textContent = name;
        profileDescription.textContent = job;
        evt.target.reset();
        closeModal(popupTypeEdit);
      }
  profileForm.addEventListener("submit", handleFormSubmit);

 

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












