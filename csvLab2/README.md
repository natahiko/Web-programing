#Робота з CSV
---
У текстовому файлі зберігається інформація про оцінки студентів з деяких дисциплін у вигляді

*100;15;71
12;100;99
…*

кожному студентові відповідає окремий рядок.
Написати клієнт-серверне застосування, яке забезпечує відображення цієї інформації в табличному вигляді; має бути гіпертекстове посилання, яке забезпечує сортування за зростанням або за спаданням середнього рейтингу.
При отриманні запиту від клієнта серверна програма має зчитувати CSV-файл та формувати масив об’єктів з відповідними властивостями.
Для відображення використати шаблонізатор (Twig, Pug і т.п.)