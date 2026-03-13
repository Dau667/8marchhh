let total = 0;

const cards = document.querySelectorAll(".card");
const totalSum = document.querySelector(".total-sum");

function updateTotal() {
    total = 0;

    document.querySelectorAll(".card").forEach(card => {
        const price = card.dataset.price;
        const qtyElement = card.querySelector(".qty");

        if (price && qtyElement) {
            const qty = parseInt(qtyElement.textContent);
            total += price * qty;
        }
    });

    document.querySelectorAll(".item").forEach(item => {
        const price = item.dataset.price;
        const qtyElement = item.querySelector(".qty");

        if (price && qtyElement) {
            const qty = parseInt(qtyElement.textContent);
            total += price * qty;
        }
    });

    totalSum.textContent = "Жалпы: " + total + " ₸";
}

document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {

        const qtyElement = btn.parentElement.querySelector(".qty");
        let qty = parseInt(qtyElement.textContent);

        qty++;
        qtyElement.textContent = qty;

        updateTotal();
    });
});

document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {

        const qtyElement = btn.parentElement.querySelector(".qty");
        let qty = parseInt(qtyElement.textContent);

        if (qty > 0) {
            qty--;
            qtyElement.textContent = qty;
        }

        updateTotal();
    });
});

document.getElementById("orderAllBtn").addEventListener("click", () => {

    let orderText = "Сәлем! Менің тапсырысым:\n\n";

    document.querySelectorAll(".card").forEach(card => {

        const title = card.querySelector("h3");
        const price = card.dataset.price;
        const qtyElement = card.querySelector(".qty");

        if (title && price && qtyElement) {

            const qty = parseInt(qtyElement.textContent);

            if (qty > 0) {
                orderText += title.textContent + " x" + qty + "\n";
            }
        }
    });

    document.querySelectorAll(".item").forEach(item => {

        const name = item.querySelector("span").textContent;
        const qtyElement = item.querySelector(".qty");

        if (qtyElement) {

            const qty = parseInt(qtyElement.textContent);

            if (qty > 0) {
                orderText += name + " x" + qty + "\n";
            }
        }
    });

    const kaspi = document.getElementById("kaspiNumber");

    if (kaspi && kaspi.value !== "") {
        orderText += "\nKaspi: " + kaspi.value;
    }

    orderText += "\n\nЖалпы: " + total + " ₸";

    const phone = "77781188800";
    const url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(orderText);

    window.open(url, "_blank");
});