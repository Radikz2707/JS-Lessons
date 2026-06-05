/* eslint-disable quotes */
/**
 * Обработка формы с использованием FormData
 * Валидация полей, вывод ошибок на страницу и асинхронная отправка
 */

// Тип для сообщений об ошибках
interface ErrorMessages {
  name?: string;
  email?: string;
}

// Создает элемент ошибки
const createErrorElement = (message: string): HTMLElement => {
  const errorEl = document.createElement("p");
  errorEl.className = "lesson-forms__error";
  errorEl.textContent = message;
  return errorEl;
};

// Отрисовывает ошибки внутри конкретной формы
const renderErrors = (form: HTMLFormElement, errors: ErrorMessages): void => {
  // Удаляем старые ошибки строго внутри этой формы
  form
    .querySelectorAll<HTMLParagraphElement>(".lesson-forms__error")
    .forEach((el) => el.remove());

  // Отрисовываем ошибку для имени
  if (errors.name) {
    const nameInput = form.querySelector<HTMLInputElement>('[name="username"]');
    if (nameInput) {
      nameInput.insertAdjacentElement("afterend", createErrorElement(errors.name));
    }
  }

  // Отрисовываем ошибку для email
  if (errors.email) {
    const emailInput =
      form.querySelector<HTMLInputElement>('[name="useremail"]');
    if (emailInput) {
      emailInput.insertAdjacentElement("afterend", createErrorElement(errors.email));
    }
  }
};

// Очищает все ошибки валидации внутри конкретной формы
const clearErrors = (form: HTMLFormElement): void => {
  form
    .querySelectorAll<HTMLParagraphElement>(".lesson-forms__error")
    .forEach((el) => el.remove());
};

// Создает и отрисовывает сообщение о результате отправки сервера
const renderResultMessage = (
  form: HTMLFormElement,
  type: "success" | "error",
  message: string,
): void => {
  clearResultMessage(form);
  const messageEl = document.createElement("p");
  messageEl.className = `lesson-forms__message _${type}`;
  messageEl.textContent = message;
  form.appendChild(messageEl);
};

// Удаляет сообщение о результате отправки
const clearResultMessage = (form: HTMLFormElement): void => {
  form
    .querySelectorAll<HTMLParagraphElement>(".lesson-forms__message")
    .forEach((el) => el.remove());
};

// Блокировка кнопки отправки
const disableSubmitButton = (button: HTMLButtonElement): void => {
  button.disabled = true;
  button.textContent = "Отправка...";
};

// Разблокировка кнопки отправки
const enableSubmitButton = (
  button: HTMLButtonElement,
  originalText: string,
): void => {
  button.disabled = false;
  button.textContent = originalText;
};

// Имитация отправки данных на сервер через Promise и setTimeout
const sendToServer = async (_formData: FormData): Promise<Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = new Response("OK", {
        status: 200,
        statusText: "OK",
      });
      resolve(mockResponse);
    }, 1500);
  });
};

export function lessonForms() {
  const form = document.querySelector<HTMLFormElement>(".lesson-forms__box");

  if (!form) return;

  const submitButton = form.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  );
  const originalButtonText = submitButton?.textContent || "Отправить";

  // Валидация обязательных полей
  const validateForm = (): ErrorMessages => {
    const nameInput = form.querySelector<HTMLInputElement>('[name="username"]');
    const emailInput =
      form.querySelector<HTMLInputElement>('[name="useremail"]');

    const errors: ErrorMessages = {};

    // Валидация имени
    if (!nameInput?.value.trim()) {
      errors.name = "Пожалуйста, введите ваше имя";
    } else if (nameInput.value.trim().length < 2) {
      errors.name = "Имя должно содержать минимум 2 символа";
    }

    // Валидация email
    if (!emailInput?.value) {
      errors.email = "Пожалуйста, введите ваш email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      errors.email = "Некорректный формат email";
    }

    return errors;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    // Очищаем старые ошибки и статусы перед новой попыткой
    clearErrors(form);
    clearResultMessage(form);

    // Валидируем форму
    const errors = validateForm();

    // Если есть ошибки - отображаем их и прерываем выполнение
    if (Object.keys(errors).length > 0) {
      renderErrors(form, errors);
      return;
    }

    // Если кнопка найдена, блокируем её на время запроса
    if (submitButton) {
      disableSubmitButton(submitButton);
    }

    try {
      const formData = new FormData(form);
      const response = await sendToServer(formData);

      if (response.ok) {
        renderResultMessage(form, "success", "Данные успешно отправлены!");
        form.reset();
      } else {
        renderResultMessage(
          form,
          "error",
          "Сервер вернул ошибку при отправке.",
        );
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      renderResultMessage(
        form,
        "error",
        "Произошла ошибка при отправке данных. Попробуйте позже.",
      );
    } finally {
      // Кнопка разблокируется в любом случае (успех или провал)
      if (submitButton) {
        enableSubmitButton(submitButton, originalButtonText);
      }
    }
  };

  // Очистка ошибок при вводе текста пользователем
  const handleInput = (): void => {
    clearErrors(form);
    clearResultMessage(form);
  };

  // Добавляем обработчики событий
  form.addEventListener("submit", handleSubmit);
  form.addEventListener("input", handleInput);

  // Возвращаем объект для удаления слушателей
  return {
    destroy: () => {
      form.removeEventListener("submit", handleSubmit);
      form.removeEventListener("input", handleInput);
    },
  };
}
