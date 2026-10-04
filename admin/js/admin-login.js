// Staff role login support
function tryStaffLogin(username, password) {
    var list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartStaff") || "[]"); } catch (e) {}
    var user = list.find(function (s) {
        return String(s.username).toLowerCase() === String(username).toLowerCase()
            && String(s.password) === String(password);
    });
    if (!user) return null;
    localStorage.setItem("seiMartCurrentStaff", JSON.stringify({
        name: user.name,
        username: user.username,
        role: user.role,
        powers: user.powers || []
    }));
    localStorage.setItem("seiMartAdminLoggedIn", "true");
    return user;
}

/* =====================================================
   SEI MART ADMIN LOGIN
===================================================== */


/* =====================================================
   LOGIN ELEMENTS
===================================================== */

const adminLoginForm =
    document.getElementById("adminLoginForm");


const adminEmail =
    document.getElementById("adminEmail");


const adminPassword =
    document.getElementById("adminPassword");


const toggleAdminPassword =
    document.getElementById("toggleAdminPassword");


const rememberAdmin =
    document.getElementById("rememberAdmin");


const adminLoginError =
    document.getElementById("adminLoginError");


const forgotAdminPassword =
    document.getElementById("forgotAdminPassword");


/* =====================================================
   ADMIN LOGIN DETAILS
===================================================== */

const ADMIN_EMAIL =
    "admin@seimart.com";


const DEFAULT_ADMIN_PASSWORD =
    "123456";


const SAVED_ADMIN_PASSWORD =
    localStorage.getItem(
        "seiMartAdminPassword"
    );


const ADMIN_PASSWORD =
    SAVED_ADMIN_PASSWORD ||
    DEFAULT_ADMIN_PASSWORD;


/* =====================================================
   SHOW PASSWORD
===================================================== */

if (toggleAdminPassword) {

    toggleAdminPassword.addEventListener(
        "click",
        function () {

            if (
                adminPassword.type ===
                "password"
            ) {

                adminPassword.type =
                    "text";

                toggleAdminPassword.textContent =
                    "Hide";

            } else {

                adminPassword.type =
                    "password";

                toggleAdminPassword.textContent =
                    "Show";

            }

        }
    );

}


/* =====================================================
   LOGIN ERROR
===================================================== */

function showLoginError(message) {

    if (!adminLoginError) {
        return;
    }


    adminLoginError.textContent =
        message;


    adminLoginError.style.display =
        "block";

}


function hideLoginError() {

    if (!adminLoginError) {
        return;
    }


    adminLoginError.textContent =
        "";


    adminLoginError.style.display =
        "none";

}


/* =====================================================
   REMEMBER ADMIN
===================================================== */

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            hideLoginError();


            const email =
                adminEmail.value.trim();


            const password =
                adminPassword.value;


            /* =========================================
               EMAIL VALIDATION
            ========================================= */

            if (!email) {

                showLoginError(
                    "Please enter your email address."
                );

                adminEmail.focus();

                return;

            }


            /* =========================================
               PASSWORD VALIDATION
            ========================================= */

            if (!password) {

                showLoginError(
                    "Please enter your password."
                );

                adminPassword.focus();

                return;

            }


            /* =========================================
               STAFF LOGIN (username or email field)
            ========================================= */

            var staffUser = tryStaffLogin(email, password);
            if (staffUser) {
                sessionStorage.setItem("seiMartAdminLoggedIn", "true");
                localStorage.setItem("seiMartAdminLoggedIn", "true");
                localStorage.setItem(
                    "seiMartAdminLastLogin",
                    new Date().toLocaleString("en-GB")
                );
                window.location.href = "../admin.html";
                return;
            }

            /* =========================================
               SUPER ADMIN LOGIN
            ========================================= */

            if (
                email.toLowerCase() ===
                    ADMIN_EMAIL.toLowerCase()
                &&
                password ===
                    ADMIN_PASSWORD
            ) {
                // clear staff session for full admin
                localStorage.removeItem("seiMartCurrentStaff");



                /* =====================================
                   LOGIN SESSION
                ===================================== */

                sessionStorage.setItem(
                    "seiMartAdminLoggedIn",
                    "true"
                );


                /* =====================================
                   LAST LOGIN
                ===================================== */

                const loginDate =
                    new Date();


                const formattedLoginDate =
                    loginDate.toLocaleString(
                        "en-GB",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                localStorage.setItem(
                    "seiMartAdminLastLogin",
                    formattedLoginDate
                );


                /* =====================================
                   REMEMBER LOGIN
                ===================================== */

                if (
                    rememberAdmin &&
                    rememberAdmin.checked
                ) {

                    localStorage.setItem(
                        "seiMartRememberAdmin",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "seiMartRememberAdmin"
                    );

                }


                /* =====================================
                   DASHBOARD
                ===================================== */

                window.location.href =
                    "../admin.html";


                return;

            }


            /* =========================================
               INVALID LOGIN
            ========================================= */

            showLoginError(
                "Invalid login. Use admin email or staff username + password."
            );

        }
    );

}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

if (forgotAdminPassword) {

    forgotAdminPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            showLoginError(
                "Password recovery will be added later. Please contact the Sei Mart administrator."
            );

        }
    );

}   