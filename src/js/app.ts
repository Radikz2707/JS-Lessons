
// 1. Собираем ВСЕ импорты в самом верху файла
import { isWebp } from "@/modules/isWebp";
import { initSandboxTabs as sandboxTabs } from "@comp/sandbox-tabs/sandbox-tabs";
import { html_sandbox } from "@comp/html_sandbox/html_sandbox";
import { sandboxUi } from "@comp/sandbox-ui/sandbox-ui";
import { lessonTable } from "@/modules/lesson-table/lesson-table";
import { lessonForms } from "@/modules/lesson-forms/lesson-forms";
import { lessonLists } from "@/modules/lesson-lists/lesson-lists";
import { lessonImages } from "@/modules/lesson-images/lesson-images";

// 2. Логирование и проверка работы сборщика
console.log("Gulp работает, алиасы настроены!");

// 3. Автоматический переключатель уроков по номерам с памятью (localStorage)
const initLessonSwitcher = (): void => {
  const select = document.getElementById(
    "lesson-select",
  ) as HTMLSelectElement | null;
  const lessons = document.querySelectorAll<HTMLElement>("[data-lesson]");

  if (!select || lessons.length === 0) return;

  // Ключ, под которым номер урока будет храниться в браузере
  const STORAGE_KEY = "active_html_lesson";

  // Функция, которая переключает видимость блоков на основе переданного номера
  const toggleLessons = (activeNum: string): void => {
    lessons.forEach((lesson): void => {
      const lessonNum = lesson.getAttribute("data-lesson");

      if (lessonNum === activeNum) {
        lesson.classList.remove("hidden");
      } else {
        lesson.classList.add("hidden");
      }
    });
  };

  // Проверяем: есть ли уже сохраненный урок в памяти браузера?
  const savedLesson = localStorage.getItem(STORAGE_KEY);

  if (savedLesson) {
    select.value = savedLesson; // Визуально ставим в селекте сохраненный номер
    toggleLessons(savedLesson); // Переключаем отображение на этот урок
  }

  // Следим за изменением значения в выпадающем списке
  select.addEventListener("change", (): void => {
    const currentNum = select.value;

    localStorage.setItem(STORAGE_KEY, currentNum); // Записываем выбранный номер в память
    toggleLessons(currentNum); // Переключаем блоки уроков
  });
};

// 4. Вызовы системных функций и инициализация интерфейса песочницы
isWebp();
sandboxUi();
html_sandbox();
sandboxTabs();
initLessonSwitcher(); // Запуск логики автоматического выбора номеров уроков с localStorage

// 5. Запуск кода ваших уроков (вызывается строго ПОСЛЕ того, как интерфейс готов)
lessonTable();
lessonForms();
lessonLists();
lessonImages();
