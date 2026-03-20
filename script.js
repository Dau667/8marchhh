document.addEventListener("DOMContentLoaded", () => {
    const totalSumEl = document.querySelector(".total-sum");
    const orderBtn = document.getElementById("orderAllBtn");

    function updateTotal() {
        let total = 0;

        document.querySelectorAll(".card, .item").forEach(el => {
            const price = parseInt(el.dataset.price);
            const qtyEl = el.querySelector(".qty");

            if (qtyEl) {
                const qty = parseInt(qtyEl.textContent);
                total += price * qty;
            }
        });

        totalSumEl.textContent = `Жалпы: ${total} ₸`;
    }

    function setupControls(container) {
        container.querySelectorAll(".increase").forEach(btn => {
            btn.addEventListener("click", () => {
                const qtyEl = btn.parentElement.querySelector(".qty");
                qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
                updateTotal();
            });
        });

        container.querySelectorAll(".decrease").forEach(btn => {
            btn.addEventListener("click", () => {
                const qtyEl = btn.parentElement.querySelector(".qty");
                let value = parseInt(qtyEl.textContent);

                if (value > 0) {
                    qtyEl.textContent = value - 1;
                    updateTotal();
                }
            });
        });
    }

    setupControls(document);

    orderBtn.addEventListener("click", () => {
        let orderText = "🧾 ЗАКАЗ:\n\n";
        let total = 0;

        document.querySelectorAll(".card, .item").forEach(el => {
            const qtyEl = el.querySelector(".qty");
            if (!qtyEl) return;

            const qty = parseInt(qtyEl.textContent);
            if (qty === 0) return;

            const price = parseInt(el.dataset.price);

            let name = "";

            if (el.classList.contains("card")) {
                name = el.querySelector("h3").textContent;
            } else {
                name = el.querySelector("span").textContent;
            }

            orderText += `${name} x${qty} = ${price * qty} ₸\n`;
            total += price * qty;
        });

        if (total === 0) {
            alert("Сначала выбери что-нибудь 😅");
            return;
        }

        const kaspi = document.getElementById("kaspiNumber").value;
        const name = document.getElementById("customerName").value;
        const address = document.getElementById("customerAddress").value;

        orderText += `\n💰 Итого: ${total} ₸\n\n`;
        orderText += `👤 Имя: ${name}\n`;
        orderText += `📞 Kaspi: ${kaspi}\n`;
        orderText += `📍 Адрес: ${address}`;

        // 👉 сюда вставь свой номер
        const phone = "77781188800";

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(orderText)}`;
        window.open(url, "_blank");
    });
});
