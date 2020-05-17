#Класний сайт
---
Створити сайт, кожна сторінка якого побудована на основі макету.
Відображення реалізувати на основі Twitter Bootstrap та одного з шаблонізаторів. Повинні бути реалізовані окремі шаблони для меню та основного контенту, які підключаються до основного шаблону. Активний розділ меню повинен бути відповідним чином виділений.
На сторінках ГОЛОВНА та ПРО НАС повинна відображатися деяка статична інформація.

На сторінці КНИГИ повинна відображатися інформація про авторів та назви книг, які зберігаються в базі даних. Для виведення книг використати Vue або React (на вибір). Кожній книзі має відповідати окремий елемент <book>; передбачити окремий компонент для його обробки.

При натисканні на лінк (або кнопку) Детальніше… повинен відображатися більш детальний опис обраної книжки.
Сайт повинен бути двомовним і підтримувати українську та англійську версії. Відповідно до цього, мають бути версії сторінок різними мовами (крім авторів та назв книжок).
Реєстраційна форма має надавати можливість користувачеві заповнити заявку. Якщо поле прізвища не заповнено, повинно виводитися повідомлення “Поле з прізвищем не повинні бути пустим”. Якщо електронна пошта є некоректною, має виводитися повідомлення “Введена пошта є некоректною”. Для перевірки електронної пошти використати регулярні вирази.
Реєстрація має здійснюватися з використанням електронної пошти.
Контроль правильності заповнення форми та виведення повідомлень повинні здійснюватися засобами клієнтського JavaScript. Якщо форма заповнена неправильно, дані на сервер відправлятися не повинні!
Заявки мають зберігатися в базі даних (на вибір - MySQL або MongoDB). Має бути також окрема сторінка для перегляду заявок.
Серверну частину реалізувати на основі Node.js або PHP (на вибір).
Назва сайту (в даному прикладі Класний сайт), його доменне ім’я (в даному прикладі mycoolsite.ua), назва файлу з зображенням для основної сторінки, а також колір меню мають читатися з конфігураційного файлу config.json.
