const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;


function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard(card, removeNodeCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardElement.querySelector(".card__delete-button");

  buttonDelete.addEventListener("click", function () {
    removeNodeCallback(cardElement);
  });

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;

  console.log(removeNodeCallback);
  return cardElement;
}

initialCards.forEach(function (item) {
  const cards = createCard(item, deleteCard);
  placesList.append(cards);
});

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
