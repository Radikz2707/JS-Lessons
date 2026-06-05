// Пиши код урока здесь
const runLesson = (log: (msg: string) => void) => {
  log("Методы массивов: Расширяемый калькулятор");

  // Интерфейс локализован внутри функции
  interface ICalculator {
    calculate(str: string): number;
    addMethod(name: string, func: (a: number, b: number) => number): void;
  }

  // Класс локализован внутри функции
  class Calculator implements ICalculator {
    private methods: Record<string, (a: number, b: number) => number> = {
      "-": (a, b) => a - b,
      "+": (a, b) => a + b,
    };

    public calculate(str: string): number {
      const split = str.split(" ");
      const a = Number(split[0]);
      const op = split[1];
      const b = Number(split[2]);

      if (!this.methods[op] || Number.isNaN(a) || Number.isNaN(b)) {
        return NaN;
      }

      return this.methods[op](a, b);
    }

    public addMethod(
      name: string,
      func: (a: number, b: number) => number,
    ): void {
      this.methods[name] = func;
    }
  }

  // Тест 1: Базовый калькулятор
  const calc = new Calculator();
  log(`Базовый тест (3 + 7): ${calc.calculate("3 + 7")}`); // Выведет 10

  // Тест 2: Расширенный калькулятор
  const powerCalc = new Calculator();
  powerCalc.addMethod("*", (a, b) => a * b);
  powerCalc.addMethod("/", (a, b) => a / b);
  powerCalc.addMethod("**", (a, b) => a ** b);

  log(`Умножение (4 * 5): ${powerCalc.calculate("4 * 5")}`); // Выведет 20
  log(`Степень (2 ** 3): ${powerCalc.calculate("2 ** 3")}`); // Выведет 8
  log(`Ошибка ввода (abc + 5): ${powerCalc.calculate("abc + 5")}`); // Выведет NaN
};

// Экспортируем только одну функцию UI
export const sandboxUi = () => {
  const output = document.getElementById("console-output");
  const btnHello = document.getElementById("btn-hello");
  const btnClear = document.getElementById("btn-clear");

  const log = (message: string) => {
    if (!output) return;
    const entry = document.createElement("div");
    entry.style.marginBottom = "5px";
    entry.innerHTML = `<span style="color: #666;">[${new Date().toLocaleTimeString()}]</span> > ${message}`;
    output.appendChild(entry);
    output.scrollTop = output.scrollHeight;
  };

  if (btnHello && output) {
    btnHello.onclick = () => runLesson(log);
  }

  if (btnClear && output) {
    btnClear.onclick = () => {
      output.innerHTML = "";
      log("Консоль очищена.");
    };
  }

  log("Песочница готова. Нажми кнопку!");
};
