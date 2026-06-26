// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем форму
    const form = document.getElementById('orderForm');
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        // Отменяем перезагрузку страницы
        event.preventDefault();
        
        // Получаем значения полей
        const fio = document.getElementById('fio').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const deliveryDay = document.getElementById('delivery_day').value;
        const comment = document.getElementById('comment').value.trim();
        
        // Получаем выбранные книги
        const bookCheckboxes = document.querySelectorAll('input[name="books"]:checked');
        const selectedBooks = Array.from(bookCheckboxes).map(cb => cb.value);
        
        // Получаем способ оплаты
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        // ===== ПРОВЕРКА НА ЗАПОЛНЕННОСТЬ ПОЛЕЙ =====
        if (fio === '') {
            alert('Не введена фамилия!');
            return;
        }
        
        if (address === '') {
            alert('Не введён адрес доставки!');
            return;
        }
        
        if (phone === '') {
            alert('Не введён телефон!');
            return;
        }
        
        if (email === '') {
            alert('Не введён адрес электронной почты!');
            return;
        }
        
        // ===== ПРОВЕРКА ТЕЛЕФОНА =====
        // Формат: +7(XXX)XXX-XX-XX
        const phonePattern = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(phone)) {
            alert('Телефон должен быть в формате +7(999)999-99-99');
            return;
        }
        
        // Проверка количества цифр (11 цифр)
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length !== 11) {
            alert('Телефон должен содержать 11 цифр (включая код страны)');
            return;
        }
        
        // ===== ПРОВЕРКА EMAIL =====
        if (!email.includes('@') || !email.includes('.')) {
            alert('Email должен содержать символы "@" и "."');
            return;
        }
        
        // ===== ПРОВЕРКА: ВЫБРАНА ХОТЯ БЫ ОДНА КНИГА =====
        if (selectedBooks.length === 0) {
            alert('Выберите хотя бы одну книгу для покупки!');
            return;
        }
        
        // ===== ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ =====
        // Создаём объект с данными заказа
        const orderData = {
            fio: fio,
            address: address,
            phone: phone,
            email: email,
            books: selectedBooks,
            payment: paymentMethod,
            deliveryDay: deliveryDay,
            comment: comment || 'Без комментария',
            date: new Date().toLocaleString('ru-RU')
        };
        
        // Добавляем карточку заказа
        addOrderCard(orderData);
        
        // Очищаем форму
        form.reset();
        
        // Показываем сообщение об успехе
        alert('Заказ успешно оформлен!');
    });
    
    // Функция добавления карточки заказа
    function addOrderCard(data) {
        const ordersGrid = document.getElementById('ordersGrid');
        
        // Создаём карточку
        const card = document.createElement('div');
        card.className = 'order-card';
        
        // Формируем список книг
        let booksList = '';
        data.books.forEach(book => {
            booksList += `<li>${book}</li>`;
        });
        
        // Заполняем карточку
        card.innerHTML = `
            <div class="order-card-header">
                <h3>Заказ №${ordersGrid.children.length + 1}</h3>
                <span class="order-date">${data.date}</span>
            </div>
            <div class="order-card-body">
                <div class="order-info-row">
                    <span class="order-label">ФИО:</span>
                    <span class="order-value">${data.fio}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-label">Адрес:</span>
                    <span class="order-value">${data.address}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-label">Телефон:</span>
                    <span class="order-value">${data.phone}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-label">Email:</span>
                    <span class="order-value">${data.email}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-label">Книги:</span>
                    <ul class="order-books-list">${booksList}</ul>
                </div>
                <div class="order-info-row">
                    <span class="order-label">Оплата:</span>
                    <span class="order-value">${data.payment}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-label">Доставка:</span>
                    <span class="order-value">${data.deliveryDay}</span>
                </div>
                <div class="order-info-row">
                    <span class="order-label">Комментарий:</span>
                    <span class="order-value">${data.comment}</span>
                </div>
            </div>
        `;
        
        // Добавляем карточку в контейнер
        ordersGrid.appendChild(card);
        
        // Прокручиваем к новой карточке
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});