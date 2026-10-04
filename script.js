// =====================================================
// SEI MART - MAIN JAVASCRIPT
// Login + Logout + Search + Cart System
// =====================================================


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();
        updateAccountStatus();

    }
);


// =====================================================
// ACCOUNT STATUS
// =====================================================

function updateAccountStatus() {

    const accountArea =
        document.getElementById("accountArea");

    if (!accountArea) {
        return;
    }

    const loggedIn =
        localStorage.getItem("seiMartLoggedIn");

    const userData =
        localStorage.getItem("seiMartUser");

    if (
        loggedIn === "true" &&
        userData
    ) {

        let user;

        try {

            user =
                JSON.parse(userData);

        } catch (error) {

            localStorage.removeItem(
                "seiMartLoggedIn"
            );

            localStorage.removeItem(
                "seiMartUser"
            );

            return;

        }


        accountArea.innerHTML =
            "👤 " +
            "<a href=\"account.html\">" +
            user.name +
            "</a> " +
            "<button " +
            "onclick=\"logoutUser()\" " +
            "class=\"logout-btn\">" +
            "Logout" +
            "</button>";

    }

    else {

        accountArea.innerHTML =
            "👤 " +
            "<a href=\"login.html\">" +
            "Sign In" +
            "</a>";

    }

}


// =====================================================
// LOGOUT
// =====================================================

function logoutUser() {

    localStorage.removeItem(
        "seiMartLoggedIn"
    );

    localStorage.removeItem(
        "seiMartUser"
    );

    window.location.href =
        "index.html";

}


// =====================================================
// SEARCH
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById(
                "searchInput"
            );

        const searchButton =
            document.querySelector(
                ".search-box button"
            );


        function doSearch() {

            if (!searchInput) {
                return;
            }


            const searchText =
                searchInput.value.trim();


            if (!searchText) {
                return;
            }


            window.location.href =
                "products.html?search=" +
                encodeURIComponent(
                    searchText
                );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        doSearch();

                    }

                }
            );

        }


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                function () {

                    doSearch();

                }
            );

        }

    }
);


// =====================================================
// GET CART
// =====================================================

function getCart() {

    return (
        JSON.parse(
            localStorage.getItem("cart")
        ) || []
    );

}


// =====================================================
// SAVE CART
// =====================================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(
    name,
    price,
    image = ""
) {

    let cart =
        getCart();


    const existingProduct =
        cart.find(
            function (item) {

                return (
                    item.name === name
                );

            }
        );


    if (existingProduct) {

        existingProduct.quantity =
            (
                Number(
                    existingProduct.quantity
                ) || 1
            ) + 1;

    }

    else {

        cart.push({

            name: name,

            price: Number(price),

            image: image,

            quantity: 1

        });

    }


    saveCart(cart);

}


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {
        return;
    }


    const cart =
        getCart();


    let totalQuantity = 0;


    cart.forEach(
        function (item) {

            totalQuantity +=
                Number(
                    item.quantity
                ) || 1;

        }
    );


    cartCount.textContent =
        totalQuantity;

}


// =====================================================
// CHANGE CART QUANTITY
// =====================================================

function changeCartQuantity(
    index,
    change
) {

    let cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (
            Number(
                cart[index].quantity
            ) || 1
        ) + change;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }


    saveCart(cart);


    if (
        typeof renderCart ===
        "function"
    ) {

        renderCart();

    }

}


// =====================================================
// REMOVE CART ITEM
// =====================================================

function removeCartItem(index) {

    let cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart(cart);


    if (
        typeof renderCart ===
        "function"
    ) {

        renderCart();

    }

}


// =====================================================
// CLEAR CART
// =====================================================

function clearCart() {

    localStorage.removeItem(
        "cart"
    );

    updateCartCount();

}


/* =========================================
   CLEAN ACTIVE NAVBAR
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const params = new URLSearchParams(window.location.search);

    const navLinks = document.querySelectorAll(".nav-menu > li > a");

    /* Remove active from ALL links first */
    navLinks.forEach(function (link) {
        link.classList.remove("active");
    });

    let activeLink = null;

    /* HOME */
    if (
        currentPage === "index.html" &&
        !params.has("filter") &&
        !params.has("category")
    ) {
        activeLink = document.querySelector(
            '.nav-menu a[href="index.html"]'
        );
    }

    /* PRODUCTS */
    else if (
        currentPage === "products.html" &&
        !params.has("filter")
    ) {
        activeLink = document.querySelector(
            '.nav-menu a[href="products.html"]'
        );
    }

    /* TODAY'S DEALS */
    else if (
        currentPage === "products.html" &&
        params.get("filter") === "deals"
    ) {
        activeLink = document.querySelector(
            '.nav-menu a[href="products.html?filter=deals"]'
        );
    }

    /* NEW ARRIVALS */
    else if (
        currentPage === "products.html" &&
        params.get("filter") === "new"
    ) {
        activeLink = document.querySelector(
            '.nav-menu a[href="products.html?filter=new"]'
        );
    }

    /* HELP & SUPPORT */
    else if (currentPage === "help.html") {
        activeLink = document.querySelector(
            '.nav-menu a[href="help.html"]'
        );
    }

    /* CONTACT */
    else if (currentPage === "contact.html") {
        activeLink = document.querySelector(
            '.nav-menu a[href="contact.html"]'
        );
    }

    /* Apply active to ONLY ONE link */
    if (activeLink) {
        activeLink.classList.add("active");
    }

});


// =====================================================
// SEI MART ADMIN PANEL
// REAL LOCALSTORAGE DATA SUPPORT
// =====================================================


// =====================================================
// GET ADMIN ORDERS
// =====================================================

function getAdminOrders() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "seiMartOrders"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


// =====================================================
// GET ADMIN CURRENT USER
// =====================================================

function getAdminCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "seiMartUser"
            )
        ) || null;

    } catch (error) {

        return null;

    }

}


// =====================================================
// ADMIN ORDER COUNT
// =====================================================

function getAdminOrderCount() {

    const orders =
        getAdminOrders();

    return orders.length;

}


// =====================================================
// ADMIN TOTAL SALES
// =====================================================

function getAdminTotalSales() {

    const orders =
        getAdminOrders();

    let total =
        0;

    orders.forEach(
        function (order) {

            total +=
                Number(
                    order.total
                ) || 0;

        }
    );

    return total;

}


// =====================================================
// ADMIN PENDING ORDERS
// =====================================================

function getAdminPendingOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            const status =
                String(
                    order.status || ""
                ).toLowerCase();

            return (
                status === "pending" ||
                status === "order placed"
            );

        }
    ).length;

}


// =====================================================
// ADMIN CONFIRMED ORDERS
// =====================================================

function getAdminConfirmedOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            const status =
                String(
                    order.status || ""
                ).toLowerCase();

            return (
                status === "confirmed" ||
                status === "order confirmed"
            );

        }
    ).length;

}


// =====================================================
// ADMIN PROCESSING ORDERS
// =====================================================

function getAdminProcessingOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            return String(
                order.status || ""
            ).toLowerCase() ===
                "processing";

        }
    ).length;

}


// =====================================================
// ADMIN SHIPPED ORDERS
// =====================================================

function getAdminShippedOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            return String(
                order.status || ""
            ).toLowerCase() ===
                "shipped";

        }
    ).length;

}


// =====================================================
// ADMIN DELIVERED ORDERS
// =====================================================

function getAdminDeliveredOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            return String(
                order.status || ""
            ).toLowerCase() ===
                "delivered";

        }
    ).length;

}


// =====================================================
// ADMIN CANCELLED ORDERS
// =====================================================

function getAdminCancelledOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            return String(
                order.status || ""
            ).toLowerCase() ===
                "cancelled";

        }
    ).length;

}


// =====================================================
// ADMIN COD ORDERS
// =====================================================

function getAdminCODOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            return String(
                order.paymentMethod || ""
            ).toLowerCase() ===
                "cash on delivery";

        }
    ).length;

}


// =====================================================
// ADMIN BKASH ORDERS
// =====================================================

function getAdminBkashOrders() {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            return String(
                order.paymentMethod || ""
            ).toLowerCase() ===
                "bkash";

        }
    ).length;

}


// =====================================================
// ADMIN PAYMENT STATUS
// =====================================================

function getAdminPaymentStatusCount(
    status
) {

    const orders =
        getAdminOrders();

    return orders.filter(
        function (order) {

            return String(
                order.paymentStatus || ""
            ).toLowerCase() ===
                String(
                    status || ""
                ).toLowerCase();

        }
    ).length;

}


// =====================================================
// ADMIN RECENT ORDERS
// =====================================================

function getAdminRecentOrders(
    limit = 5
) {

    const orders =
        getAdminOrders();

    return orders
        .slice()
        .reverse()
        .slice(
            0,
            limit
        );

}


// =====================================================
// ADMIN CUSTOMER COUNT
// =====================================================

function getAdminCustomerCount() {

    const orders =
        getAdminOrders();

    const customers =
        new Set();

    orders.forEach(
        function (order) {

            const customer =
                order.customer || {};

            const email =
                customer.email ||
                customer.phone ||
                customer.name;

            if (email) {

                customers.add(
                    String(email)
                        .toLowerCase()
                );

            }

        }
    );

    return customers.size;

}


// =====================================================
// ADMIN ORDER BY ID
// =====================================================

function getAdminOrderById(
    orderId
) {

    const orders =
        getAdminOrders();

    return orders.find(
        function (order) {

            return String(
                order.orderId
            ) === String(
                orderId
            );

        }
    ) || null;

}


// =====================================================
// ADMIN SAVE ORDERS
// =====================================================

function saveAdminOrders(
    orders
) {

    localStorage.setItem(
        "seiMartOrders",
        JSON.stringify(
            orders
        )
    );

}


// =====================================================
// ADMIN UPDATE ORDER STATUS
// =====================================================

function updateAdminOrderStatus(
    orderId,
    newStatus
) {

    const orders =
        getAdminOrders();

    const order =
        orders.find(
            function (item) {

                return String(
                    item.orderId
                ) === String(
                    orderId
                );

            }
        );

    if (!order) {
        return false;
    }

    order.status =
        newStatus;

    order.updatedAt =
        new Date().toISOString();

    saveAdminOrders(
        orders
    );

    return true;

}


// =====================================================
// ADMIN UPDATE PAYMENT STATUS
// =====================================================

function updateAdminPaymentStatus(
    orderId,
    newStatus
) {

    const orders =
        getAdminOrders();

    const order =
        orders.find(
            function (item) {

                return String(
                    item.orderId
                ) === String(
                    orderId
                );

            }
        );

    if (!order) {
        return false;
    }

    order.paymentStatus =
        newStatus;

    order.updatedAt =
        new Date().toISOString();

    saveAdminOrders(
        orders
    );

    return true;

}


// =====================================================
// ADMIN PRODUCT REVIEWS
// =====================================================

function getAdminProductReviews() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "seiMartProductReviews"
            )
        ) || {};

    } catch (error) {

        return {};

    }

}


// =====================================================
// ADMIN REVIEW COUNT
// =====================================================

function getAdminReviewCount() {

    const reviews =
        getAdminProductReviews();

    let count =
        0;

    Object.keys(
        reviews
    ).forEach(
        function (productId) {

            if (
                Array.isArray(
                    reviews[
                        productId
                    ]
                )
            ) {

                count +=
                    reviews[
                        productId
                    ].length;

            }

        }
    );

    return count;

}


// =====================================================
// ADMIN SUPPORT REQUESTS
// =====================================================

function getAdminSupportRequests() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "seiMartSupportRequests"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


// =====================================================
// ADMIN SUPPORT REQUEST COUNT
// =====================================================

function getAdminSupportRequestCount() {

    return getAdminSupportRequests().length;

}


// =====================================================
// ADMIN CONTACT MESSAGES
// =====================================================

function getAdminContactMessages() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "seiMartContactMessages"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


// =====================================================
// ADMIN LOCAL DATA REFRESH EVENT
// =====================================================

function refreshAdminData() {

    window.dispatchEvent(
        new CustomEvent(
            "seiMartAdminDataUpdated"
        )
    );

}


// =====================================================
// ADMIN DATA UPDATE EVENT
// =====================================================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
                "seiMartOrders" ||
            event.key ===
                "seiMartProductReviews" ||
            event.key ===
                "seiMartSupportRequests"
        ) {

            refreshAdminData();

        }

    }
);


// =====================================================
// SEI MART ADMIN PANEL READY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.body &&
            document.body.classList.contains(
                "admin-page"
            )
        ) {

            refreshAdminData();

        }

    }
);
// =====================================================
// SEI MART - UNIFIED DATA LAYER (Professional)
// Products + Wishlist + Reviews + Messages + Seed
// =====================================================

const SEIMART_DEFAULT_PRODUCTS = [
    { id: "smart-tv", name: "Smart LED TV", price: 28500, category: "electronics", deal: true, discount: 20, stock: 15, image: "image/products/product-1.png", description: "Full HD Smart LED TV with built-in apps." },
    { id: "bluetooth-speaker", name: "Portable Bluetooth Speaker", price: 2450, category: "electronics", stock: 40, image: "image/products/product-2.png", description: "Portable speaker with deep bass." },
    { id: "wireless-headphone", name: "Wireless Headphone", price: 3200, category: "electronics", deal: true, discount: 25, stock: 30, image: "image/products/product-3.png", description: "Noise cancelling wireless headphone." },
    { id: "gaming-headset", name: "Gaming Headset", price: 2850, category: "electronics", stock: 25, image: "image/products/product-4.png", description: "Comfortable gaming headset with mic." },
    { id: "smart-projector", name: "Mini Smart Projector", price: 6500, category: "electronics", stock: 10, image: "image/products/product-5.png", description: "Portable mini smart projector." },
    { id: "type-c-cable", name: "Fast Charging Type-C Cable", price: 450, category: "mobile", stock: 100, image: "image/products/product-1.png", description: "1.5m fast charging Type-C cable." },
    { id: "fast-charger", name: "25W Fast Charger", price: 1250, category: "mobile", stock: 60, image: "image/products/product-2.png", description: "25W PD fast charger." },
    { id: "power-bank", name: "10000mAh Power Bank", price: 1850, category: "mobile", stock: 45, image: "image/products/product-3.png", description: "Compact 10000mAh power bank." },
    { id: "mobile-stand", name: "Adjustable Mobile Stand", price: 550, category: "mobile", stock: 80, image: "image/products/product-4.png", description: "Adjustable desk mobile stand." },
    { id: "wireless-charger", name: "Wireless Charging Pad", price: 1450, category: "mobile", stock: 35, image: "image/products/product-5.png", description: "15W wireless charging pad." },
    { id: "premium-tshirt", name: "Premium Cotton T-Shirt", price: 850, category: "fashion", stock: 50, image: "image/products/product-1.png", description: "100% cotton premium t-shirt." },
    { id: "polo-shirt", name: "Classic Polo Shirt", price: 1150, category: "fashion", stock: 40, image: "image/products/product-2.png", description: "Classic fit polo shirt." },
    { id: "denim-jeans", name: "Slim Fit Denim Jeans", price: 1850, category: "fashion", deal: true, discount: 15, stock: 35, image: "image/products/product-3.png", description: "Slim fit stretch denim jeans." },
    { id: "casual-shirt", name: "Casual Formal Shirt", price: 1450, category: "fashion", stock: 30, image: "image/products/product-4.png", description: "Comfortable casual formal shirt." },
    { id: "hoodie", name: "Winter Hoodie", price: 1650, category: "fashion", stock: 25, image: "image/products/product-5.png", description: "Warm winter hoodie." },
    { id: "running-shoes", name: "Running Sports Shoes", price: 2450, category: "shoes", deal: true, discount: 18, stock: 28, image: "image/products/product-1.png", description: "Lightweight running shoes." },
    { id: "casual-sneakers", name: "Casual Sneakers", price: 1950, category: "shoes", stock: 32, image: "image/products/product-2.png", description: "Everyday casual sneakers." },
    { id: "formal-shoes", name: "Leather Formal Shoes", price: 3200, category: "shoes", stock: 18, image: "image/products/product-3.png", description: "Genuine look leather formal shoes." },
    { id: "sandal", name: "Comfort Sandal", price: 950, category: "shoes", stock: 40, image: "image/products/product-4.png", description: "Comfortable daily sandal." },
    { id: "lipstick", name: "Matte Lipstick Set", price: 850, category: "cosmetics", stock: 55, image: "image/products/product-5.png", description: "Long lasting matte lipstick set." },
    { id: "foundation", name: "Liquid Foundation", price: 1250, category: "cosmetics", stock: 40, image: "image/products/product-1.png", description: "Natural finish liquid foundation." },
    { id: "perfume-men", name: "Men's Perfume 100ml", price: 1850, category: "perfume", deal: true, discount: 12, stock: 30, image: "image/products/product-2.png", description: "Long lasting men's perfume." },
    { id: "perfume-women", name: "Women's Perfume 100ml", price: 1950, category: "perfume", stock: 28, image: "image/products/product-3.png", description: "Elegant women's perfume." },
    { id: "smart-watch", name: "Smart Watch", isNew: true, price: 3500, category: "watches", deal: true, discount: 20, stock: 22, image: "image/products/product-4.png", description: "Fitness tracking smart watch." },
    { id: "analog-watch", name: "Classic Analog Watch", price: 2200, category: "watches", stock: 20, image: "image/products/product-5.png", description: "Classic analog wrist watch." },
    { id: "bed-sheet", name: "Cotton Bed Sheet Set", price: 1650, category: "home", stock: 35, image: "image/products/product-1.png", description: "Soft cotton bed sheet set." },
    { id: "cushion", name: "Decorative Cushion", price: 650, category: "home", stock: 50, image: "image/products/product-2.png", description: "Soft decorative cushion." },
    { id: "gold-necklace", name: "Gold Plated Necklace", price: 2850, category: "jewellery", stock: 15, image: "image/products/product-3.png", description: "Elegant gold plated necklace." },
    { id: "earring-set", name: "Fashion Earring Set", price: 950, category: "jewellery", stock: 40, image: "image/products/product-4.png", description: "Trendy fashion earring set." },
    { id: "face-cream", name: "Daily Face Cream", isNew: true, price: 750, category: "beauty", stock: 60, image: "image/products/product-5.png", description: "Moisturizing daily face cream." },
    { id: "body-lotion", name: "Body Lotion 400ml", price: 550, category: "beauty", stock: 70, image: "image/products/product-1.png", description: "Nourishing body lotion." },
    { id: "beauty-kit", name: "Essential Beauty Kit", isNew: true, price: 1650, category: "beauty", stock: 25, image: "image/products/product-2.png", description: "Complete essential beauty kit." }
];

function getProducts() {
    var DEFAULT_IMG = "image/products/product-1.png";
    function normalize(list) {
        return (list || []).map(function (p) {
            p = Object.assign({}, p);
            p.id = String(p.id || "");
            p.name = p.name || "Product";
            p.price = Number(p.price) || 0;
            p.stock = Number(p.stock);
            if (isNaN(p.stock)) p.stock = 0;
            p.category = p.category || "general";
            p.description = p.description || "";
            var cycle = [
                "image/products/product-1.png",
                "image/products/product-2.png",
                "image/products/product-3.png",
                "image/products/product-4.png",
                "image/products/product-5.png"
            ];
            // stable cycle by id hash
            var hash = 0;
            var sid = String(p.id || p.name || "");
            for (var hi = 0; hi < sid.length; hi++) hash = (hash + sid.charCodeAt(hi) * (hi + 1)) % 997;
            var imgPath = cycle[hash % cycle.length];
            p.image = imgPath;
            p.images = [imgPath];
            p.colors = Array.isArray(p.colors) ? p.colors : [];
            p.sizes = Array.isArray(p.sizes) ? p.sizes : [];
            p.brand = p.brand || "Sei Mart";
            p.warranty = p.warranty || "7 days replacement";
            p.rating = Number(p.rating) || 4.5;
            p.reviews = Number(p.reviews) || 0;
            return p;
        });
    }
    try {
        const stored = localStorage.getItem("seiMartProducts");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                var normalized = normalize(parsed);
                // keep stock etc but force image
                localStorage.setItem("seiMartProducts", JSON.stringify(normalized));
                return normalized;
            }
        }
    } catch (e) {}
    var seeded = normalize(SEIMART_DEFAULT_PRODUCTS);
    localStorage.setItem("seiMartProducts", JSON.stringify(seeded));
    return seeded.slice();
}

function saveProducts(products) {
    localStorage.setItem("seiMartProducts", JSON.stringify(products || []));
    refreshAdminData();
}

function getProductById(id) {
    return getProducts().find(function (p) {
        return String(p.id) === String(id);
    }) || null;
}

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem("seiMartWishlist") || "[]");
    } catch (e) {
        return [];
    }
}

function saveWishlist(list) {
    localStorage.setItem("seiMartWishlist", JSON.stringify(list || []));
}

function isInWishlist(productId) {
    return getWishlist().some(function (id) {
        return String(id) === String(productId);
    });
}

function toggleWishlistItem(productId) {
    var list = getWishlist();
    var idx = list.findIndex(function (id) {
        return String(id) === String(productId);
    });
    if (idx >= 0) {
        list.splice(idx, 1);
    } else {
        list.push(productId);
    }
    saveWishlist(list);
    return list;
}

function getProductReviews(productId) {
    try {
        var all = JSON.parse(localStorage.getItem("seiMartProductReviews") || "{}");
        return all[productId] || [];
    } catch (e) {
        return [];
    }
}

function saveProductReview(productId, review) {
    try {
        var all = JSON.parse(localStorage.getItem("seiMartProductReviews") || "{}");
        if (!all[productId]) all[productId] = [];
        all[productId].push(review);
        localStorage.setItem("seiMartProductReviews", JSON.stringify(all));
        refreshAdminData();
    } catch (e) {}
}

function getContactMessages() {
    try {
        return JSON.parse(localStorage.getItem("seiMartContactMessages") || "[]");
    } catch (e) {
        return [];
    }
}

function saveContactMessage(msg) {
    var list = getContactMessages();
    list.unshift(msg);
    localStorage.setItem("seiMartContactMessages", JSON.stringify(list));
    refreshAdminData();
}

function getSupportRequests() {
    try {
        return JSON.parse(localStorage.getItem("seiMartSupportRequests") || "[]");
    } catch (e) {
        return [];
    }
}

function formatPrice(amount) {
    return "৳" + Number(amount || 0).toLocaleString("en-BD");
}

function generateOrderId() {
    return "SM" + Date.now().toString().slice(-8);
}

// Ensure products are seeded on first load
document.addEventListener("DOMContentLoaded", function () {
    getProducts(); // seed if empty
});


// =====================================================
// ORDER STATUS TRACKING (with timestamps)
// =====================================================

var SEIMART_STATUS_STEPS = [
    "Order Placed",
    "Order Confirmed",
    "Processing",
    "Shipped",
    "Delivered"
];

function normalizeOrderStatus(status) {
    var s = String(status || "").trim().toLowerCase();
    if (!s || s === "pending") return "Order Placed";
    if (s.indexOf("cancel") >= 0) return "Cancelled";
    if (s.indexOf("deliver") >= 0) return "Delivered";
    if (s.indexOf("ship") >= 0) return "Shipped";
    if (s.indexOf("process") >= 0) return "Processing";
    if (s.indexOf("confirm") >= 0) return "Order Confirmed";
    if (s.indexOf("placed") >= 0 || s.indexOf("order placed") >= 0) return "Order Placed";
    return status || "Order Placed";
}

function makeStatusHistoryEntry(status, note) {
    return {
        status: normalizeOrderStatus(status),
        at: new Date().toISOString(),
        label: new Date().toLocaleString("en-BD"),
        note: note || ""
    };
}

function ensureOrderStatusHistory(order) {
    if (!order) return order;
    if (!Array.isArray(order.statusHistory) || order.statusHistory.length === 0) {
        var initial = normalizeOrderStatus(order.status || "Order Placed");
        order.statusHistory = [{
            status: initial,
            at: order.createdAt || order.date || new Date().toISOString(),
            label: order.date || new Date().toLocaleString("en-BD"),
            note: "Order created"
        }];
    }
    return order;
}

function appendOrderStatus(order, newStatus, note) {
    order = ensureOrderStatusHistory(order);
    var status = normalizeOrderStatus(newStatus);
    order.status = status;
    var last = order.statusHistory[order.statusHistory.length - 1];
    if (last && normalizeOrderStatus(last.status) === status) {
        last.at = new Date().toISOString();
        last.label = new Date().toLocaleString("en-BD");
        if (note) last.note = note;
        return order;
    }
    order.statusHistory.push(makeStatusHistoryEntry(status, note));
    return order;
}

function getOrders() {
    try {
        var data = JSON.parse(localStorage.getItem("seiMartOrders") || "[]");
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

function saveOrders(orders) {
    localStorage.setItem("seiMartOrders", JSON.stringify(orders || []));
    if (typeof refreshAdminData === "function") refreshAdminData();
}

function findOrderById(orderId) {
    return getOrders().find(function (o) {
        return String(o.orderId) === String(orderId);
    }) || null;
}

function getStatusStepIndex(status) {
    status = normalizeOrderStatus(status);
    if (status === "Cancelled") return -1;
    return SEIMART_STATUS_STEPS.indexOf(status);
}

function buildStatusTimelineHTML(order) {
    order = ensureOrderStatusHistory(order);
    var history = order.statusHistory || [];
    var current = normalizeOrderStatus(order.status);
    var isCancelled = current === "Cancelled";

    var html = '<div class="sei-timeline" style="margin:16px 0;">';

    if (isCancelled) {
        html += '<div style="padding:12px 14px;background:#fdeceb;border:1px solid #f5c6c2;border-radius:8px;color:#d9534f;font-weight:600;">✕ Order Cancelled</div>';
        history.forEach(function (h) {
            html += '<div style="display:flex;gap:12px;margin-top:12px;align-items:flex-start;">' +
                '<div style="width:12px;height:12px;border-radius:50%;background:#d9534f;margin-top:4px;flex-shrink:0;"></div>' +
                '<div><div style="font-weight:600;">' + (h.status || "") + '</div>' +
                '<div style="font-size:13px;color:#7b877f;">' + (h.label || h.at || "") + '</div>' +
                (h.note ? '<div style="font-size:12px;color:#999;">' + h.note + '</div>' : '') +
                '</div></div>';
        });
        html += '</div>';
        return html;
    }

    var currentIdx = getStatusStepIndex(current);
    SEIMART_STATUS_STEPS.forEach(function (step, i) {
        var done = i <= currentIdx;
        var isCurrent = i === currentIdx;
        var hist = null;
        for (var j = history.length - 1; j >= 0; j--) {
            if (normalizeOrderStatus(history[j].status) === step) {
                hist = history[j];
                break;
            }
        }
        var color = done ? "#3f6f5a" : "#c5cec8";
        var bg = done ? "#3f6f5a" : "#fff";
        var border = done ? "#3f6f5a" : "#c5cec8";
        html += '<div style="display:flex;gap:14px;align-items:flex-start;position:relative;padding-bottom:' + (i < SEIMART_STATUS_STEPS.length - 1 ? "18px" : "0") + ';">';
        if (i < SEIMART_STATUS_STEPS.length - 1) {
            html += '<div style="position:absolute;left:7px;top:16px;bottom:0;width:2px;background:' + (i < currentIdx ? "#3f6f5a" : "#e3e9e4") + ';"></div>';
        }
        html += '<div style="width:16px;height:16px;border-radius:50%;background:' + bg + ';border:2px solid ' + border + ';flex-shrink:0;z-index:1;box-sizing:border-box;"></div>';
        html += '<div style="flex:1;">';
        html += '<div style="font-weight:' + (isCurrent ? "700" : "600") + ';color:' + (done ? "#17231d" : "#9aa59e") + ';">' + step + (isCurrent ? " ← Current" : "") + '</div>';
        if (hist) {
            html += '<div style="font-size:13px;color:#7b877f;margin-top:2px;">' + (hist.label || hist.at || "") + '</div>';
            if (hist.note) html += '<div style="font-size:12px;color:#999;">' + hist.note + '</div>';
        } else if (!done) {
            html += '<div style="font-size:12px;color:#b0b8b3;">Pending</div>';
        }
        html += '</div></div>';
    });

    html += '</div>';
    return html;
}


// =====================================================
// STOCK AUTO-DEDUCT + COUPON USAGE
// =====================================================

function deductStockForOrder(order) {
    if (!order || !Array.isArray(order.items)) return;
    var products = (typeof getProducts === "function") ? getProducts() : [];
    var changed = false;
    order.items.forEach(function (item) {
        var qty = Number(item.quantity) || 1;
        var idx = products.findIndex(function (p) {
            return String(p.id) === String(item.id) ||
                String(p.name).toLowerCase() === String(item.name || "").toLowerCase();
        });
        if (idx >= 0) {
            var stock = Number(products[idx].stock);
            if (isNaN(stock)) stock = 0;
            products[idx].stock = Math.max(0, stock - qty);
            changed = true;
        }
    });
    if (changed) {
        if (typeof saveProducts === "function") saveProducts(products);
        else localStorage.setItem("seiMartProducts", JSON.stringify(products));
    }
}

function recordCouponUsage(code, userKey) {
    if (!code) return;
    try {
        var coupons = JSON.parse(localStorage.getItem("seiMartCoupons") || "[]");
        var i = coupons.findIndex(function (c) { return String(c.code).toUpperCase() === String(code).toUpperCase(); });
        if (i >= 0) {
            coupons[i].usedCount = (Number(coupons[i].usedCount) || 0) + 1;
            if (!Array.isArray(coupons[i].usedBy)) coupons[i].usedBy = [];
            if (userKey && coupons[i].usedBy.indexOf(userKey) === -1) {
                coupons[i].usedBy.push(userKey);
            }
            localStorage.setItem("seiMartCoupons", JSON.stringify(coupons));
        }
        // also track usage log
        var log = JSON.parse(localStorage.getItem("seiMartCouponUsage") || "[]");
        log.push({ code: code, user: userKey || "", at: new Date().toISOString() });
        localStorage.setItem("seiMartCouponUsage", JSON.stringify(log));
    } catch (e) {}
}

function validateCouponForCheckout(code, subtotal, userKey) {
    code = String(code || "").trim().toUpperCase();
    if (!code) return { ok: false, message: "Enter a coupon code." };

    if (code === "SEI7") {
        return { ok: true, code: "SEI7", type: "percent", value: 7, discount: Math.round(subtotal * 0.07) };
    }

    var coupons = [];
    try { coupons = JSON.parse(localStorage.getItem("seiMartCoupons") || "[]"); } catch (e) {}
    var found = null;
    for (var i = 0; i < coupons.length; i++) {
        if (String(coupons[i].code || "").toUpperCase() === code) { found = coupons[i]; break; }
    }
    if (!found) return { ok: false, message: "Invalid coupon code." };
    if (found.active === false) return { ok: false, message: "This coupon is disabled." };

    if (found.expires) {
        var exp = new Date(found.expires);
        exp.setHours(23, 59, 59, 999);
        if (new Date() > exp) return { ok: false, message: "This coupon has expired." };
    }
    var minOrder = Number(found.minOrder) || 0;
    if (subtotal < minOrder) {
        return { ok: false, message: "Minimum order ৳" + minOrder.toLocaleString() + " required." };
    }
    var usageLimit = Number(found.usageLimit) || 0;
    var usedCount = Number(found.usedCount) || 0;
    if (usageLimit > 0 && usedCount >= usageLimit) {
        return { ok: false, message: "Coupon usage limit reached." };
    }
    var perUser = Number(found.perUserLimit) || 0;
    if (perUser > 0 && userKey) {
        var usedBy = Array.isArray(found.usedBy) ? found.usedBy : [];
        var userUses = usedBy.filter(function (u) { return u === userKey; }).length;
        // usedBy stores unique users once - also check usage log
        try {
            var log = JSON.parse(localStorage.getItem("seiMartCouponUsage") || "[]");
            userUses = log.filter(function (x) {
                return String(x.code).toUpperCase() === code && x.user === userKey;
            }).length;
        } catch (e) {}
        if (userUses >= perUser) {
            return { ok: false, message: "You already used this coupon the maximum times." };
        }
    }

    var discount = 0;
    if (found.type === "percent") discount = Math.round(subtotal * (Number(found.value) || 0) / 100);
    else discount = Math.round(Number(found.value) || 0);
    if (discount > subtotal) discount = subtotal;

    return { ok: true, code: found.code, type: found.type, value: found.value, discount: discount };
}

function getWebsiteContentData() {
    try { return JSON.parse(localStorage.getItem("seiMartWebsiteContent") || "{}"); }
    catch (e) { return {}; }
}



/* =====================================================
   GLOBAL UI: Footer, Mobile Nav, Dark Mode, Animations
===================================================== */

function injectGlobalStyles() {
    if (document.getElementById("seiGlobalUIStyles")) return;
    var s = document.createElement("style");
    s.id = "seiGlobalUIStyles";
    s.textContent = `
    /* Micro animations */
    .product-card, .home-deal-card, .home-category-card, .home-cat-card, .related-card {
      transition: transform .22s ease, box-shadow .22s ease !important;
    }
    .product-card:hover, .home-deal-card:hover, .home-category-card:hover, .home-cat-card:hover, .related-card:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 12px 28px rgba(31,52,41,.12) !important;
    }
    button, .hero-shop-btn, .add-cart-btn, .add-details-btn, .buy-details-btn, .admin-view-order-btn {
      transition: transform .12s ease, opacity .15s ease, background .2s ease !important;
    }
    button:active, .hero-shop-btn:active, .add-cart-btn:active {
      transform: scale(0.97) !important;
    }
    body.sei-fade-in { animation: seiFade .35s ease; }
    @keyframes seiFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

    /* Unified form controls */
    .sei-input, input[type="text"], input[type="email"], input[type="password"], input[type="tel"], input[type="number"], input[type="search"], select, textarea {
      border-radius: 10px !important;
      border: 1px solid #d5ddd8 !important;
      padding: 11px 14px !important;
      font-size: 14px !important;
      transition: border-color .2s, box-shadow .2s !important;
      background: #fff;
    }
    .sei-input:focus, input:focus, select:focus, textarea:focus {
      outline: none !important;
      border-color: #3f6f5a !important;
      box-shadow: 0 0 0 3px rgba(63,111,90,.15) !important;
    }

    /* Dark mode */
    body.sei-dark {
      background: #121a16 !important;
      color: #e8eee9 !important;
    }
    body.sei-dark .product-card,
    body.sei-dark .home-deal-card,
    body.sei-dark .products-container,
    body.sei-dark .details-page,
    body.sei-dark header,
    body.sei-dark .navbar,
    body.sei-dark .header,
    body.sei-dark .main-header {
      background: #1a2420 !important;
      color: #e8eee9 !important;
      border-color: #2a3832 !important;
    }
    body.sei-dark a { color: #e8c65a; }
    body.sei-dark input, body.sei-dark select, body.sei-dark textarea {
      background: #24302b !important;
      color: #e8eee9 !important;
      border-color: #3a4a43 !important;
    }

    /* Mobile drawer */
    .sei-hamburger {
      display: none;
      background: #3f6f5a;
      color: #fff;
      border: none;
      border-radius: 10px;
      width: 44px;
      height: 44px;
      font-size: 20px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 900px) {
      .sei-hamburger { display: inline-flex; }
      .nav-menu { display: none !important; }
    }
    .sei-drawer-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      z-index: 10000; opacity: 0; pointer-events: none; transition: opacity .25s;
    }
    .sei-drawer-overlay.open { opacity: 1; pointer-events: auto; }
    .sei-drawer {
      position: fixed; top: 0; right: 0; width: min(320px, 88vw); height: 100%;
      background: #17231d; color: #e8eee9; z-index: 10001;
      transform: translateX(105%); transition: transform .28s ease;
      padding: 24px 18px; overflow-y: auto;
    }
    .sei-drawer.open { transform: translateX(0); }
    .sei-drawer a {
      display: block; color: #e8eee9; text-decoration: none;
      padding: 12px 10px; border-radius: 8px; font-weight: 600;
      border-bottom: 1px solid rgba(255,255,255,.06);
    }
    .sei-drawer a:hover { background: rgba(63,111,90,.35); color: #e8c65a; }
    .sei-drawer .drawer-close {
      background: transparent; border: 1px solid rgba(255,255,255,.2);
      color: #fff; border-radius: 8px; padding: 8px 12px; cursor: pointer; float: right;
    }

    /* Skeletons */
    .sei-skeleton {
      background: linear-gradient(90deg, #e9eeeb 25%, #f5f7f5 50%, #e9eeeb 75%);
      background-size: 200% 100%;
      animation: seiSkel 1.2s ease infinite;
      border-radius: 12px;
    }
    @keyframes seiSkel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    body.sei-dark .sei-skeleton {
      background: linear-gradient(90deg, #1e2a25 25%, #2a3832 50%, #1e2a25 75%);
      background-size: 200% 100%;
    }

    /* Professional footer */
    #seiSiteFooter {
      margin-top: 56px;
      background: linear-gradient(165deg, #0f1a15 0%, #17231d 40%, #1e2f28 100%);
      color: #c5cec8;
      border-top: 3px solid #d4a017;
    }
    #seiSiteFooter .foot-inner {
      width: 90%; max-width: 1140px; margin: 0 auto; padding: 48px 0 20px;
    }
    #seiSiteFooter .foot-grid {
      display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 28px;
    }
    @media (max-width: 800px) {
      #seiSiteFooter .foot-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 500px) {
      #seiSiteFooter .foot-grid { grid-template-columns: 1fr; }
    }
    #seiSiteFooter .brand-row {
      display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
    }
    #seiSiteFooter .brand-row img {
      width: 48px; height: 48px; object-fit: contain; border-radius: 10px;
      background: #fff; padding: 4px;
    }
    #seiSiteFooter h4 {
      color: #fff; margin: 0 0 14px; font-size: 15px; letter-spacing: .3px;
    }
    #seiSiteFooter a {
      color: #b8c5be; text-decoration: none; display: block; margin: 7px 0;
      font-size: 14px; transition: color .2s;
    }
    #seiSiteFooter a:hover { color: #e8c65a; }
    #seiSiteFooter .admin-btn {
      display: inline-block !important; margin-top: 14px !important;
      padding: 10px 16px !important; background: #3f6f5a !important;
      color: #fff !important; border-radius: 10px !important; font-weight: 700 !important;
    }
    #seiSiteFooter .foot-bottom {
      margin-top: 32px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.08);
      display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px;
      font-size: 13px; opacity: .85;
    }
    `;
    document.head.appendChild(s);
}

function injectSiteFooter() {
    if (document.getElementById("seiSiteFooter")) return;
    var path = (location.pathname || "").toLowerCase();
    if (path.indexOf("/admin") >= 0 || path.endsWith("admin.html")) return;

    var footer = document.createElement("footer");
    footer.id = "seiSiteFooter";
    footer.innerHTML =
        '<div class="foot-inner">' +
        '<div class="foot-grid">' +
        '<div><div class="brand-row">' +
        '<img src="image/logo-seimart.png" alt="Sei Mart">' +
        '<div><strong style="color:#fff;font-size:18px;">Sei Mart</strong><div style="color:#e8c65a;font-size:12px;font-weight:700;">Shop Smart</div></div>' +
        '</div><p style="margin:0;line-height:1.6;font-size:14px;color:#a8b5ae;">Quality products across Bangladesh — electronics, fashion, beauty & more.</p></div>' +
        '<div><h4>Shop</h4>' +
        '<a href="products.html">All Products</a>' +
        '<a href="products.html?filter=deals">Todays Deals</a>' +
        '<a href="products.html?filter=new">New Arrivals</a>' +
        '<a href="wishlist.html">Wishlist</a>' +
        '<a href="sell-with-seimart.html">Sell with Sei Mart</a></div>' +
        '<div><h4>Support</h4>' +
        '<a href="order-tracking.html">Track Order</a>' +
        '<a href="help.html">Help Center</a>' +
        '<a href="contact.html">Contact Us</a>' +
        '<a href="return-policy.html">Returns</a>' +
        '<a href="account.html">My Account</a></div>' +
        '<div><h4>Company</h4>' +
        '<a href="privacy-policy.html">Privacy Policy</a>' +
        '<a href="terms.html">Terms of Use</a>' +
        '<a href="sell-with-seimart.html">Become a Seller</a><a href="affiliate.html">Affiliate Program</a>' +
        '<a class="admin-btn" href="admin/login.html">🔐 Staff / Admin Login</a></div>' +
        '</div>' +
        '<div class="foot-bottom"><span>© 2026 Sei Mart. All rights reserved.</span><span>Made for Bangladesh shoppers</span></div>' +
        '</div>';
    document.body.appendChild(footer);
}

function injectMobileNav() {
    if (document.getElementById("seiDrawer")) return;
    var path = (location.pathname || "").toLowerCase();
    if (path.indexOf("/admin") >= 0 || path.endsWith("admin.html")) return;

    // hamburger near header
    var header = document.querySelector("header") || document.querySelector(".navbar") || document.querySelector("nav");
    if (header && !document.getElementById("seiHamburger")) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.id = "seiHamburger";
        btn.className = "sei-hamburger";
        btn.setAttribute("aria-label", "Menu");
        btn.innerHTML = "☰";
        btn.onclick = openSeiDrawer;
        // place in header top row if possible
        var top = header.querySelector(".nav-container") || header.querySelector(".container") || header;
        top.appendChild(btn);
        btn.style.position = "absolute";
        btn.style.right = "16px";
        btn.style.top = "14px";
        if (header.style.position !== "fixed") header.style.position = "relative";
    }

    var overlay = document.createElement("div");
    overlay.className = "sei-drawer-overlay";
    overlay.id = "seiDrawerOverlay";
    overlay.onclick = closeSeiDrawer;

    var drawer = document.createElement("div");
    drawer.className = "sei-drawer";
    drawer.id = "seiDrawer";
    drawer.innerHTML =
        '<button type="button" class="drawer-close" onclick="closeSeiDrawer()">✕ Close</button>' +
        '<div style="clear:both;height:12px;"></div>' +
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">' +
        '<img src="image/logo-seimart.png" alt="" style="width:40px;height:40px;border-radius:8px;background:#fff;padding:3px;">' +
        '<strong style="font-size:18px;color:#e8c65a;">Sei Mart</strong></div>' +
        '<a href="index.html" onclick="closeSeiDrawer()">Home</a>' +
        '<a href="products.html" onclick="closeSeiDrawer()">Products</a>' +
        '<a href="products.html?filter=deals" onclick="closeSeiDrawer()">Todays Deals</a>' +
        '<a href="products.html?filter=new" onclick="closeSeiDrawer()">New Arrivals</a>' +
        '<a href="order-tracking.html" onclick="closeSeiDrawer()">Order Tracking</a>' +
        '<a href="wishlist.html" onclick="closeSeiDrawer()">Wishlist</a>' +
        '<a href="cart.html" onclick="closeSeiDrawer()">Cart</a>' +
        '<a href="account.html" onclick="closeSeiDrawer()">My Account</a>' +
        '<a href="sell-with-seimart.html" onclick="closeSeiDrawer()">Sell with Sei Mart</a>' +
        '<a href="help.html" onclick="closeSeiDrawer()">Help & Support</a>' +
        '<a href="contact.html" onclick="closeSeiDrawer()">Contact</a>' +
        '<a href="admin/login.html" onclick="closeSeiDrawer()" style="margin-top:12px;background:#3f6f5a;text-align:center;">Staff Login</a>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
}
function openSeiDrawer() {
    var o = document.getElementById("seiDrawerOverlay");
    var d = document.getElementById("seiDrawer");
    if (o) o.classList.add("open");
    if (d) d.classList.add("open");
}
function closeSeiDrawer() {
    var o = document.getElementById("seiDrawerOverlay");
    var d = document.getElementById("seiDrawer");
    if (o) o.classList.remove("open");
    if (d) d.classList.remove("open");
}

function injectLangAndNotif() {
    if (document.getElementById("seiTopUtils")) return;
    var path = (location.pathname || "").toLowerCase();
    if (path.indexOf("/admin") >= 0 || path.endsWith("admin.html")) return;

    var bar = document.createElement("div");
    bar.id = "seiTopUtils";
    bar.style.cssText = "position:fixed;bottom:20px;left:16px;z-index:9998;display:flex;gap:8px;flex-wrap:wrap;align-items:center;";
    bar.innerHTML =
        '<button type="button" id="seiDarkBtn" onclick="toggleSeiDark()" style="background:#17231d;color:#e8c65a;border:none;border-radius:20px;padding:8px 12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.15);">🌙</button>' +
        '<button type="button" id="seiLangBtn" onclick="toggleSeiLang()" style="background:#fff;border:1px solid #d0d7d3;border-radius:20px;padding:8px 12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.1);">EN | বাং</button>' +
        '<button type="button" id="seiNotifBtn" onclick="toggleSeiNotif()" style="background:#3f6f5a;color:#fff;border:none;border-radius:20px;padding:8px 12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.15);position:relative;">🔔 <span id="seiNotifCount" style="display:none;position:absolute;top:-4px;right:-4px;background:#d9534f;color:#fff;border-radius:50%;width:18px;height:18px;font-size:11px;line-height:18px;text-align:center;">0</span></button>' +
        '<div id="seiNotifPanel" style="display:none;position:fixed;bottom:60px;left:16px;width:300px;max-width:90vw;background:#fff;border:1px solid #e3e9e4;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.15);padding:12px;max-height:320px;overflow:auto;"></div>';
    document.body.appendChild(bar);
    updateSeiNotifBadge();
    applySeiLang();
    if (localStorage.getItem("seiMartDark") === "1") {
        document.body.classList.add("sei-dark");
        var db = document.getElementById("seiDarkBtn");
        if (db) db.textContent = "☀️";
    }
}

function toggleSeiDark() {
    var on = document.body.classList.toggle("sei-dark");
    localStorage.setItem("seiMartDark", on ? "1" : "0");
    var db = document.getElementById("seiDarkBtn");
    if (db) db.textContent = on ? "☀️" : "🌙";
}

function addRecentlyViewed(productId) {
    try {
        var list = JSON.parse(localStorage.getItem("seiMartRecent") || "[]");
        list = list.filter(function (id) { return String(id) !== String(productId); });
        list.unshift(String(productId));
        list = list.slice(0, 12);
        localStorage.setItem("seiMartRecent", JSON.stringify(list));
    } catch (e) {}
}
function getRecentlyViewedProducts() {
    try {
        var ids = JSON.parse(localStorage.getItem("seiMartRecent") || "[]");
        var products = getProducts();
        return ids.map(function (id) {
            return products.find(function (p) { return String(p.id) === String(id); });
        }).filter(Boolean);
    } catch (e) { return []; }
}
function getSeiNotifications() {
    try { return JSON.parse(localStorage.getItem("seiMartNotifications") || "[]"); } catch (e) { return []; }
}
function pushSeiNotification(title, body) {
    var list = getSeiNotifications();
    list.unshift({ title: title, body: body || "", at: new Date().toISOString(), label: new Date().toLocaleString("en-BD"), read: false });
    list = list.slice(0, 30);
    localStorage.setItem("seiMartNotifications", JSON.stringify(list));
    updateSeiNotifBadge();
}
function updateSeiNotifBadge() {
    var list = getSeiNotifications();
    var unread = list.filter(function (n) { return !n.read; }).length;
    var el = document.getElementById("seiNotifCount");
    if (!el) return;
    if (unread > 0) { el.style.display = "block"; el.textContent = String(unread); }
    else el.style.display = "none";
}
function toggleSeiNotif() {
    var panel = document.getElementById("seiNotifPanel");
    if (!panel) return;
    if (panel.style.display === "block") { panel.style.display = "none"; return; }
    var list = getSeiNotifications();
    list.forEach(function (n) { n.read = true; });
    localStorage.setItem("seiMartNotifications", JSON.stringify(list));
    updateSeiNotifBadge();
    if (!list.length) panel.innerHTML = '<p style="color:#999;margin:8px;font-size:14px;">No notifications yet.</p>';
    else panel.innerHTML = list.slice(0, 15).map(function (n) {
        return '<div style="padding:10px;border-bottom:1px solid #eee;"><strong style="display:block;color:#17231d;">' +
            String(n.title || "").replace(/</g, "") + '</strong><span style="font-size:12px;color:#7b877f;">' +
            String(n.label || "") + '</span><p style="margin:4px 0 0;font-size:13px;color:#555;">' +
            String(n.body || "").replace(/</g, "") + '</p></div>';
    }).join("");
    panel.style.display = "block";
}
function toggleSeiLang() {
    var cur = localStorage.getItem("seiMartLang") || "en";
    localStorage.setItem("seiMartLang", cur === "en" ? "bn" : "en");
    applySeiLang();
}
function applySeiLang() {
    var lang = localStorage.getItem("seiMartLang") || "en";
    var btn = document.getElementById("seiLangBtn");
    if (btn) btn.textContent = lang === "bn" ? "বাং | EN" : "EN | বাং";
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
}
function checkAbandonedCart() {
    if (sessionStorage.getItem("seiCartReminded")) return;
    var cart = [];
    try { cart = JSON.parse(localStorage.getItem("cart") || localStorage.getItem("seiMartCart") || "[]"); } catch (e) {}
    if (!Array.isArray(cart) || !cart.length) return;
    var path = location.pathname || "";
    if (path.indexOf("cart") >= 0 || path.indexOf("checkout") >= 0) return;
    setTimeout(function () {
        if (sessionStorage.getItem("seiCartReminded")) return;
        sessionStorage.setItem("seiCartReminded", "1");
        pushSeiNotification("Cart waiting", "You have " + cart.length + " item(s) in your cart.");
        var box = document.createElement("div");
        box.style.cssText = "position:fixed;bottom:80px;right:16px;z-index:9997;background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:16px;max-width:280px;box-shadow:0 12px 32px rgba(0,0,0,.15);";
        box.innerHTML = '<strong>Items in your cart</strong><p style="margin:8px 0;color:#555;font-size:14px;">You left ' + cart.length + ' item(s).</p>' +
            '<a href="cart.html" style="display:inline-block;background:#3f6f5a;color:#fff;padding:8px 14px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">View Cart</a> ' +
            '<button type="button" onclick="this.parentNode.remove()" style="margin-left:6px;border:none;background:#eee;padding:8px 12px;border-radius:8px;cursor:pointer;">Dismiss</button>';
        document.body.appendChild(box);
    }, 4000);
}
function addAllWishlistToCart() {
    var ids = [];
    try { ids = JSON.parse(localStorage.getItem("seiMartWishlist") || "[]"); } catch (e) {}
    var products = getProducts();
    var cart = [];
    try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) {}
    if (!Array.isArray(cart)) cart = [];
    var added = 0;
    ids.forEach(function (id) {
        var p = products.find(function (x) { return String(x.id) === String(id); });
        if (!p) return;
        var idx = cart.findIndex(function (c) { return String(c.id) === String(p.id); });
        if (idx >= 0) cart[idx].quantity = (Number(cart[idx].quantity) || 1) + 1;
        else cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 });
        added++;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("seiMartCart", JSON.stringify(cart));
    alert(added ? (added + " item(s) added to cart") : "Wishlist is empty");
    return added;
}
function injectPwaLite() {
    if (document.querySelector('link[rel="manifest"]')) return;
    var link = document.createElement("link");
    link.rel = "manifest";
    link.href = "manifest.json";
    document.head.appendChild(link);
    var meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#3f6f5a";
    document.head.appendChild(meta);
}
function showProductSkeletons(container, count) {
    if (!container) return;
    count = count || 8;
    var html = "";
    for (var i = 0; i < count; i++) {
        html += '<div class="sei-skeleton" style="height:260px;"></div>';
    }
    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
    try { injectGlobalStyles(); } catch (e) {}
    try { document.body.classList.add("sei-fade-in"); } catch (e) {}
    try { injectSiteFooter(); } catch (e) {}
    try { injectMobileNav(); } catch (e) {}
    try { injectLangAndNotif(); } catch (e) {}
    try { injectPwaLite(); } catch (e) {}
    try { checkAbandonedCart(); } catch (e) {}
});
document.addEventListener("DOMContentLoaded", function () {
    try { injectSiteFooter(); } catch (e) {}
    try { injectLangAndNotif(); } catch (e) {}
    try { injectPwaLite(); } catch (e) {}
    try { checkAbandonedCart(); } catch (e) {}
});

