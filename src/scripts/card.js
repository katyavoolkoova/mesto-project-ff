const createCard = ({
  data,
  userId,
  removeNodeCallback,
  handleOpenImageCallback,
  likeCardCallback,
}) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const counter = cardElement.querySelector(".card__like-counter");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => {
    handleOpenImageCallback({ cardName: data.name, cardLink: data.link });
  });

  if (data.likes.length) {
    counter.classList.add("card__like-counter_is-active");
    counter.textContent = data.likes.length;
  }

  if (data.owner["_id"] === userId) {
    buttonDelete.classList.add("card__delete-button_is-active");
    buttonDelete.addEventListener("click", () => {
      removeNodeCallback({
        cardId: data["_id"],
        cardElement,
        buttonElement: buttonDelete,
      });
    });
  }

  if (data.likes.find((cardElement) => cardElement["_id"] === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    likeCardCallback({
      cardId: data["_id"],
      buttonElement: cardLikeButton,
      counterElement: counter,
    });
  });

  return cardElement;
};

export { createCard };
