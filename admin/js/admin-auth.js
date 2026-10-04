/* =====================================================
   SEI MART ADMIN AUTHENTICATION GUARD
===================================================== */
/*
(function () {

    const isLoggedIn =
        sessionStorage.getItem(
            "seiMartAdminLoggedIn"
        );

    if (isLoggedIn !== "true") {

        window.location.href =
            "admin/login.html";

        return;

    }

})();