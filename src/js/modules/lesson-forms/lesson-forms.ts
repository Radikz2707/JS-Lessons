export function lessonForms() {
  // Находим форму строго по вашему БЭМ-классу из HTML
  const form = document.querySelector(".lesson-forms__box") as HTMLFormElement;

  if (!form) return;

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault(); // Блокируем перезагрузку страницы

    const formData = new FormData(form);

    // Достаем данные по атрибутам name, которые мы только что прописали в HTML
    const name = formData.get("username") as string;
    const email = formData.get("useremail") as string;

    // Выводим интерактивный результат
    console.log("Данные формы:", { name, email });
    alert(
      `Отлично, ${name}! Ваша форма успешно обработана без перезагрузки.\nEmail: ${email}`,
    );

    form.reset(); // Очищаем поля формы
  });
}
