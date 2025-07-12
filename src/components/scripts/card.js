function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(cardLikeButton) {
  const likeActive = document.querySelector("card__like-button_is-active");
  if (!likeActive) {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  } else {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }
}

const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, callbacksObject) {
  const { removeNodeCallback, handleOpenImageCallback, likeCardCallback } =
    callbacksObject;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  buttonDelete.addEventListener("click", function () {
    removeNodeCallback(cardElement);
  });

  cardImage.addEventListener("click", function () {
    handleOpenImageCallback(card);
  });

  cardLikeButton.addEventListener("click", function () {
    likeCardCallback(cardLikeButton);
  });

  return cardElement;
}

export { createCard, deleteCard, likeCard };
