(() => {
    "use strict";

    const STORAGE_KEY = "frontend-auth-users";
    const DEFAULT_USER = {
        name: "Default Admin",
        email: "admin@gmail.com",
        phone: "1234567890",
        password: "password123"
    };
    const gmailPattern = /^[a-z0-9._%+-]+@gmail\.com$/i;

    const $ = (id) => document.getElementById(id);
    const signInForm = $("signin-form");
    const signUpForm = $("signup-form");
    const notification = $("global-notification");

    function readUsers() {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            return Array.isArray(stored) ? stored : [];
        } catch (error) {
            console.error("Could not read saved users.", error);
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    function initialiseUsers() {
        const users = readUsers();
        if (!users.some((user) => user.email.toLowerCase() === DEFAULT_USER.email)) {
            saveUsers([DEFAULT_USER, ...users]);
        }
    }

    function showAlert(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
    }

    function clearAlert() {
        notification.textContent = "";
        notification.className = "notification";
    }

    function setError(inputId, errorId, message) {
        const input = $(inputId);
        const error = $(errorId);
        input.setAttribute("aria-invalid", String(Boolean(message)));
        error.textContent = message;
    }

    function switchTab(tab) {
        const isSignIn = tab === "signin";
        signInForm.classList.toggle("hidden", !isSignIn);
        signUpForm.classList.toggle("hidden", isSignIn);
        $("tab-signin").classList.toggle("active", isSignIn);
        $("tab-signup").classList.toggle("active", !isSignIn);
        $("tab-signin").setAttribute("aria-selected", String(isSignIn));
        $("tab-signup").setAttribute("aria-selected", String(!isSignIn));
        clearAlert();
    }

    $("tab-signin").addEventListener("click", () => switchTab("signin"));
    $("tab-signup").addEventListener("click", () => switchTab("signup"));

    signInForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = $("signin-email").value.trim().toLowerCase();
        const password = $("signin-password").value;
        let valid = true;

        setError("signin-email", "signin-email-err", "");
        setError("signin-password", "signin-password-err", "");
        if (!gmailPattern.test(email)) {
            setError("signin-email", "signin-email-err", "Enter a valid @gmail.com address.");
            valid = false;
        }
        if (!password) {
            setError("signin-password", "signin-password-err", "Enter your password.");
            valid = false;
        }
        if (!valid) return;

        const user = readUsers().find((entry) => entry.email.toLowerCase() === email && entry.password === password);
        if (!user) {
            showAlert("The Gmail address or password is incorrect.", "error");
            return;
        }
        showAlert(`Welcome back, ${user.name}! You are signed in.`, "success");
        signInForm.reset();
    });

    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = $("signup-name").value.trim();
        const email = $("signup-email").value.trim().toLowerCase();
        const phone = $("signup-phone").value.trim();
        const password = $("signup-pass").value;
        const confirmation = $("signup-confirm").value;
        const digits = phone.replace(/\D/g, "");
        let valid = true;

        setError("signup-name", "signup-name-err", "");
        setError("signup-email", "signup-email-err", "");
        setError("signup-phone", "signup-phone-err", "");
        setError("signup-pass", "signup-pass-err", "");
        setError("signup-confirm", "signup-confirm-err", "");

        if (name.length < 3) {
            setError("signup-name", "signup-name-err", "Enter your full name (at least 3 characters).");
            valid = false;
        }
        if (!gmailPattern.test(email)) {
            setError("signup-email", "signup-email-err", "Use a valid @gmail.com address.");
            valid = false;
        }
        if (digits.length < 7 || digits.length > 15) {
            setError("signup-phone", "signup-phone-err", "Enter a phone number with 7 to 15 digits.");
            valid = false;
        }
        if (password.length < 6) {
            setError("signup-pass", "signup-pass-err", "Password must be at least 6 characters.");
            valid = false;
        }
        if (password !== confirmation) {
            setError("signup-confirm", "signup-confirm-err", "Passwords do not match.");
            valid = false;
        }
        if (!valid) return;

        const users = readUsers();
        if (users.some((user) => user.email.toLowerCase() === email)) {
            showAlert("That Gmail address is already registered.", "error");
            return;
        }
        users.push({ name, email, phone: digits, password });
        saveUsers(users);
        signUpForm.reset();
        switchTab("signin");
        $("signin-email").value = email;
        showAlert("Account created. Sign in with your new details.", "success");
    });

    initialiseUsers();
})();
