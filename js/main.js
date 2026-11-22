
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("show");
            menuBtn.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("show");
                menuBtn.classList.remove("active");
            });
        });
    }

    const searchBtn = document.querySelector(".search-btn");
    const searchBox = document.querySelector(".search-box");
    const searchInput = document.querySelector(".search-box input");

    if (searchBtn && searchBox) {
        searchBtn.addEventListener("click", () => {
            searchBox.classList.toggle("show");

            if (searchBox.classList.contains("show") && searchInput) {
                setTimeout(() => searchInput.focus(), 150);
            }
        });
    }

    const products = document.querySelectorAll(".product-card");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase().trim();

            products.forEach(product => {
                const text = product.textContent.toLowerCase();

                product.style.display =
                    text.includes(value) ? "" : "none";
            });
        });
    }

    let cartCount = Number(localStorage.getItem("fayzCartCount")) || 0;

    const cartNumbers = document.querySelectorAll(".cart-btn span");

    const updateCart = () => {
        cartNumbers.forEach(number => {
            number.textContent = cartCount;
        });

        localStorage.setItem("fayzCartCount", cartCount);
    };

    updateCart();

    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            updateCart();

            const oldText = button.textContent;

            button.textContent = "Qo‘shildi ✓";
            button.classList.add("added");

            setTimeout(() => {
                button.textContent = oldText;
                button.classList.remove("added");
            }, 1200);
        });
    });

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const category = button.dataset.category;

            products.forEach(product => {
                const productCategory = product.dataset.category;

                if (
                    category === "all" ||
                    !category ||
                    productCategory === category
                ) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });

    const orderForm = document.querySelector(".order-form");
    const formMessage = document.querySelector(".form-message");

    if (orderForm) {
        orderForm.addEventListener("submit", event => {
            event.preventDefault();

            const name = orderForm.querySelector('[name="name"]');
            const phone = orderForm.querySelector('[name="phone"]');
            const product = orderForm.querySelector('[name="product"]');
            const quantity = orderForm.querySelector('[name="quantity"]');
            const address = orderForm.querySelector('[name="address"]');

            if (
                !name ||
                !phone ||
                !product ||
                !quantity ||
                !address
            ) {
                return;
            }

            if (
                name.value.trim() === "" ||
                phone.value.trim() === "" ||
                product.value === "" ||
                quantity.value < 1 ||
                address.value.trim() === ""
            ) {
                if (formMessage) {
                    formMessage.textContent =
                        "Iltimos, kerakli maydonlarni to‘ldiring!";
                    formMessage.classList.add("error");
                }

                return;
            }

            if (formMessage) {
                formMessage.textContent =
                    "Zakazingiz qabul qilindi! Tez orada siz bilan bog‘lanamiz.";
                formMessage.classList.remove("error");
                formMessage.classList.add("success");
            }

            orderForm.reset();

            if (quantity) {
                quantity.value = 1;
            }

            setTimeout(() => {
                if (formMessage) {
                    formMessage.textContent = "";
                    formMessage.classList.remove("success", "error");
                }
            }, 5000);
        });
    }

    const phoneInputs = document.querySelectorAll(
        'input[type="tel"]'
    );

    phoneInputs.forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^\d+()\-\s]/g, "");
        });
    });

    const backTop = document.querySelector(".back-top");

    if (backTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }
        });

        backTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    document.addEventListener("click", event => {
        if (
            searchBox &&
            searchBox.classList.contains("show") &&
            !searchBox.contains(event.target) &&
            !searchBtn.contains(event.target)
        ) {
            searchBox.classList.remove("show");
        }
    });
});

