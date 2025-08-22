import "./pages/index.css";

import { openModal, closeModal, hangListeners } from "./scripts/modal.js";
import { createCard as DOMCreateCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getInitialCards as APIGetInitialCards,
  createCard as APICreateCard,
  deleteCard as APIDeleteCard,
  likeCard as APILikeCard,
  unLikeCard as APIUnLikeCard,
  getUserInfo as APIGetUserInfo,
  updateUserInfo as APIUpdateUserInfo,
  updateUserAvatar as APIUpdateUserAvatar,
} from "./scripts/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const placesList = document.querySelector(".places__list");
const profileForm = document.forms["edit-profile"];
const profileFormSubmitButton = profileForm.querySelector(".popup__button");
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const profileImageForm = document.forms["edit-avatar"];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton =
  profileImageForm.querySelector(".popup__button");

const popupProfileImage = document.querySelector(".popup_type_edit-avatar");

const newPlaceForm = document.forms["new-place"];
const newPlaceFormSubmitButton = newPlaceForm.querySelector(".popup__button");

const cardNameInput = newPlaceForm.elements["place-name"];
const cardLinkInput = newPlaceForm.elements.link;

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");

const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button_confirm");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");

const profileImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");


const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains("card__like-button_is-active")) {
    APIUnLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove("card__like-button_is-active");

        if (likes.length) {
          counterElement.classList.add("card__like-counter_is-active");
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove("card__like-counter_is-active");
          counterElement.textContent = "";
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add("card__like-button_is-active");
        counterElement.classList.add("card__like-counter_is-active");
        counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    APIDeleteCard(cardId)
      .then(() => {
        buttonElement.closest(".card").remove();

        closeModal(popupConfirm);
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

const handleFormNewCardSubmit = (evt) => {
  evt.preventDefault();

  renderLoading({
    buttonElement: newPlaceFormSubmitButton,
    isLoading: true,
  });

  APICreateCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      placesList.prepend(
        DOMCreateCard({
          userId: cardData.owner["_id"],
          data: cardData,
          removeNodeCallback: handleCardDelete,
          likeCardCallback: handleCardLike,
          handleOpenImageCallback: handleOpenImage,
        })
      );

      newPlaceForm.reset();

      closeModal(popupTypeNewCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: newPlaceFormSubmitButton,
        isLoading: false,
      });
    });
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });
  APIUpdateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileFormSubmitButton,
        isLoading: false,
      });
    });
}

const handleProfileImageFormSubmit = (evt) => {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });

  APIUpdateUserAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
};



profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
});

profileAddButton.addEventListener("click", () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupTypeNewCard);
});


const handleOpenImage = ({ cardName, cardLink }) => {
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupImageCaption.textContent = cardName;
  openModal(popupTypeImage);
}

const handleProfileImageClick = () => {
  profileImageForm.reset();

  clearValidation(profileImageForm, validationConfig);

  openModal(popupProfileImage);
};

hangListeners(popupTypeNewCard);
hangListeners(popupTypeEdit);
hangListeners(popupTypeImage);
hangListeners(popupProfileImage);
hangListeners(popupConfirm);
profileImage.addEventListener("click", handleProfileImageClick);
profileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleFormNewCardSubmit);
profileImageForm.addEventListener("submit", handleProfileImageFormSubmit);

enableValidation(validationConfig);

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
  .then(([{ name, about, avatar, ["_id"]: userId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      placesList.append(
        DOMCreateCard({
          userId,
          data: cardData,
          removeNodeCallback: handleCardDelete,
          likeCardCallback: handleCardLike,
          handleOpenImageCallback: handleOpenImage,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
