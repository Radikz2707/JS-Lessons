export const initSandboxTabs = (): void => {
  // Явно указываем типы HTMLButtonElement для кнопок
  const btnHtml = document.querySelector<HTMLButtonElement>(
    "[data-target=\"html-section\"]",
  );
  const btnJs = document.querySelector<HTMLButtonElement>(
    "[data-target=\"js-section\"]",
  );

  // Явно указываем HTMLElement для секций песочниц
  const htmlSection = document.getElementById("html-section");
  const jsSection = document.getElementById("js-section");

  // Защита TypeScript: проверяем, что все элементы найдены на странице
  if (!btnHtml || !btnJs || !htmlSection || !jsSection) return;

  // Внутренняя функция сброса активности кнопок
  const resetActiveButtons = (): void => {
    btnHtml.classList.remove("sandbox-tabs__btn_active");
    btnJs.classList.remove("sandbox-tabs__btn_active");
  };

  // Переключение на HTML
  btnHtml.addEventListener("click", (): void => {
    resetActiveButtons();
    btnHtml.classList.add("sandbox-tabs__btn_active");

    htmlSection.classList.remove("hidden"); // Показываем HTML
    jsSection.classList.add("hidden"); // Скрываем JS
  });

  // Переключение на JS
  btnJs.addEventListener("click", (): void => {
    resetActiveButtons();
    btnJs.classList.add("sandbox-tabs__btn_active");

    jsSection.classList.remove("hidden"); // Показываем JS
    htmlSection.classList.add("hidden"); // Скрываем HTML
  });
};
