/* =========================================================
   INCLURA AUTHENTICATION SYSTEM
   Enterprise Authentication + Session + Roles
   ========================================================= */

class IncluraAuthSystem {

    constructor() {

        this.currentUser = null;

        this.roles = [
            "user",
            "creator",
            "mentor",
            "business",
            "admin"
        ];

        this.sessionKey = "inclura_session";

        this.tokenKey = "inclura_token";

        this.init();

    }

    /* =========================================================
       INITIALIZATION
    ========================================================= */

    init() {

        this.restoreSession();

        this.attachLoginListeners();

        this.attachSignupListeners();

        this.attachLogoutListeners();

        this.initializeAccessibility();

        this.initializeSecurity();

        console.log("Inclura Auth System Initialized");

    }

    /* =========================================================
       LOGIN SYSTEM
    ========================================================= */

    login(credentials) {

        const {
            email,
            username,
            phone,
            password
        } = credentials;

        if (
            (!email && !username && !phone)
            || !password
        ) {

            this.showNotification(
                "Please complete login credentials",
                "error"
            );

            return false;

        }

        const fakeToken = this.generateToken();

        const fakeUser = {

            id: Date.now(),

            name: "Inclura User",

            email: email || "user@inclura.com",

            role: localStorage.getItem("inclura_selected_role") || "user",

            verified: true,

            accessibility: {

                screenReader: false,
                highContrast: false,
                keyboardOnly: false,
                voiceNavigation: false

            }

        };

        localStorage.setItem(
            this.sessionKey,
            JSON.stringify(fakeUser)
        );

        localStorage.setItem(
            this.tokenKey,
            fakeToken
        );

        this.currentUser = fakeUser;

        this.showNotification(
            "Login successful",
            "success"
        );

        this.redirectAfterLogin(fakeUser.role);

        return true;

    }

    /* =========================================================
       SIGNUP SYSTEM
    ========================================================= */

    signup(data) {

        const {
            fullName,
            email,
            password,
            role
        } = data;

        if (
            !fullName ||
            !email ||
            !password
        ) {

            this.showNotification(
                "Please complete all fields",
                "error"
            );

            return false;

        }

        if (!this.roles.includes(role)) {

            this.showNotification(
                "Invalid role selected",
                "error"
            );

            return false;

        }

        const newUser = {

            id: Date.now(),

            fullName,

            email,

            role,

            createdAt: new Date(),

            verified: false,

            accessibility: {

                screenReader: false,
                highContrast: false,
                keyboardOnly: false,
                voiceNavigation: false

            }

        };

        localStorage.setItem(
            "inclura_pending_user",
            JSON.stringify(newUser)
        );

        this.showNotification(
            "Signup successful. Please login.",
            "success"
        );

        window.location.href = "login.html";

        return true;

    }

    /* =========================================================
       LOGOUT
    ========================================================= */

    logout() {

        localStorage.removeItem(this.sessionKey);

        localStorage.removeItem(this.tokenKey);

        this.currentUser = null;

        this.showNotification(
            "Logged out successfully",
            "success"
        );

        window.location.href = "login.html";

    }

    /* =========================================================
       SESSION RESTORATION
    ========================================================= */

    restoreSession() {

        const session = localStorage.getItem(this.sessionKey);

        if (!session) return;

        try {

            this.currentUser = JSON.parse(session);

            console.log(
                "Session restored",
                this.currentUser
            );

        } catch(error) {

            console.error(
                "Session restoration failed",
                error
            );

        }

    }

    /* =========================================================
       AUTH CHECK
    ========================================================= */

    isAuthenticated() {

        return !!localStorage.getItem(this.tokenKey);

    }

    /* =========================================================
       ROLE CHECK
    ========================================================= */

    hasRole(role) {

        if (!this.currentUser) return false;

        return this.currentUser.role === role;

    }

    /* =========================================================
       PROTECTED ROUTES
    ========================================================= */

    protectRoute(allowedRoles = []) {

        if (!this.isAuthenticated()) {

            window.location.href = "login.html";

            return false;

        }

        if (
            allowedRoles.length > 0 &&
            !allowedRoles.includes(this.currentUser.role)
        ) {

            this.showNotification(
                "Access denied",
                "error"
            );

            window.location.href = "dashboard.html";

            return false;

        }

        return true;

    }

    /* =========================================================
       TOKEN GENERATOR
    ========================================================= */

    generateToken() {

        return (
            "inclura_" +
            Math.random().toString(36).substring(2) +
            Date.now()
        );

    }

    /* =========================================================
       REDIRECT AFTER LOGIN
    ========================================================= */

    redirectAfterLogin(role) {

        switch(role) {

            case "admin":
                window.location.href = "admin-dashboard.html";
                break;

            case "creator":
                window.location.href = "creatorstudio.html";
                break;

            case "mentor":
                window.location.href = "mentorship.html";
                break;

            case "business":
                window.location.href = "analytics.html";
                break;

            default:
                window.location.href = "dashboard.html";

        }

    }

    /* =========================================================
       LOGIN FORM LISTENERS
    ========================================================= */

    attachLoginListeners() {

        const loginForm = document.getElementById("loginForm");

        if (!loginForm) return;

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const credentials = {

                email: document.getElementById("email")?.value,

                username: document.getElementById("username")?.value,

                phone: document.getElementById("phone")?.value,

                password: document.getElementById("password")?.value

            };

            this.login(credentials);

        });

    }

    /* =========================================================
       SIGNUP FORM LISTENERS
    ========================================================= */

    attachSignupListeners() {

        const signupForm = document.getElementById("signupForm");

        if (!signupForm) return;

        signupForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const data = {

                fullName:
                    document.getElementById("fullName")?.value,

                email:
                    document.getElementById("signupEmail")?.value,

                password:
                    document.getElementById("signupPassword")?.value,

                role:
                    document.getElementById("role")?.value

            };

            this.signup(data);

        });

    }

    /* =========================================================
       LOGOUT BUTTONS
    ========================================================= */

    attachLogoutListeners() {

        const logoutButtons =
            document.querySelectorAll(".logout-btn");

        logoutButtons.forEach((button) => {

            button.addEventListener("click", () => {

                this.logout();

            });

        });

    }

    /* =========================================================
       ACCESSIBILITY SUPPORT
    ========================================================= */

    initializeAccessibility() {

        const html = document.documentElement;

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (prefersReducedMotion) {

            html.classList.add("reduced-motion");

        }

        document.addEventListener("keydown", (e) => {

            if (e.key === "Tab") {

                html.classList.add("keyboard-navigation");

            }

        });

        console.log(
            "Accessibility authentication initialized"
        );

    }

    /* =========================================================
       SECURITY SYSTEM
    ========================================================= */

    initializeSecurity() {

        window.addEventListener("storage", () => {

            if (!localStorage.getItem(this.tokenKey)) {

                window.location.href = "login.html";

            }

        });

        this.detectSuspiciousActivity();

    }

    /* =========================================================
       SUSPICIOUS LOGIN DETECTION
    ========================================================= */

    detectSuspiciousActivity() {

        const failedAttempts =
            Number(localStorage.getItem("failed_attempts")) || 0;

        if (failedAttempts >= 5) {

            this.showNotification(
                "Suspicious login attempts detected",
                "warning"
            );

        }

    }

    /* =========================================================
       OAUTH PLACEHOLDERS
    ========================================================= */

    loginWithGoogle() {

        console.log("Google OAuth Coming Soon");

    }

    loginWithApple() {

        console.log("Apple OAuth Coming Soon");

    }

    loginWithFacebook() {

        console.log("Facebook OAuth Coming Soon");

    }

    loginWithLinkedIn() {

        console.log("LinkedIn OAuth Coming Soon");

    }

    loginWithX() {

        console.log("X OAuth Coming Soon");

    }

    /* =========================================================
       GLOBAL NOTIFICATIONS
    ========================================================= */

    showNotification(message, type = "info") {

        const notification = document.createElement("div");

        notification.className =
            `inclura-auth-notification ${type}`;

        notification.innerText = message;

        notification.style.position = "fixed";
        notification.style.top = "20px";
        notification.style.right = "20px";
        notification.style.padding = "16px 22px";
        notification.style.borderRadius = "14px";
        notification.style.zIndex = "99999";
        notification.style.color = "white";
        notification.style.fontWeight = "bold";
        notification.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.2)";

        switch(type) {

            case "success":
                notification.style.background = "#16a34a";
                break;

            case "error":
                notification.style.background = "#dc2626";
                break;

            case "warning":
                notification.style.background = "#ea580c";
                break;

            default:
                notification.style.background = "#2563eb";

        }

        document.body.appendChild(notification);

        setTimeout(() => {

            notification.remove();

        }, 4000);

    }

}

/* =========================================================
   INITIALIZE AUTH SYSTEM
========================================================= */

const incluraAuth = new IncluraAuthSystem();

/* =========================================================
   GLOBAL HELPERS
========================================================= */

function protectAdminPage() {

    incluraAuth.protectRoute(["admin"]);

}

function protectCreatorPage() {

    incluraAuth.protectRoute([
        "creator",
        "admin"
    ]);

}

function protectBusinessPage() {

    incluraAuth.protectRoute([
        "business",
        "admin"
    ]);

}

function protectAuthenticatedPage() {

    incluraAuth.protectRoute();

}
