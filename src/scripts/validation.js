const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = ({
  inputList,
  buttonElement,
  inactiveButtonClass
}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const showInputError = ({
  formElement,
  inputElement,
  
  errorClass,
  errorMessage,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;

  inputElement.classList.add("popup__input_type_error");
};

const hideInputError = ({
  formElement,
  inputElement,
  
  errorClass,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';

  inputElement.classList.remove("popup__input_type_error");
};

const isValid = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError({
      formElement,
      inputElement,
      errorMessage: inputElement.validationMessage,
      errorClass,
      inputErrorClass,
    });
  } else {
    hideInputError({
      formElement,
      inputElement,
      errorClass,
      inputErrorClass,
    });
  }
};



const setEventListeners = ({
  formElement,
  inactiveButtonClass,
  inputErrorClass,
  submitButtonSelector,
  errorClass,
}) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(submitButtonSelector);


  toggleButtonState({
    inputList,
    buttonElement,
    inactiveButtonClass
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid({
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
      });
      toggleButtonState({
        inputList,
        buttonElement,
        inactiveButtonClass
      });
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = document.querySelectorAll(formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners({
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
};

const clearValidation = (
  formElement,
  {
    submitButtonSelector,
    inactiveButtonClass,
    
    inputErrorClass,
    errorClass,
  }
) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError({
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
    });
  });

  toggleButtonState({
    inputList,
    buttonElement,
    inactiveButtonClass,
  });
};

export { enableValidation, clearValidation };

