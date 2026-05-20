
/* =========================================================
   INCLURA APP ROUTER SYSTEM
   Global Navigation + Role Routing + Accessibility Engine
   ========================================================= */

class IncluraRouter {

    constructor() {

        this.currentPage = this.getCurrentPage();

        this.userRole = localStorage.getItem("inclura_role") || "user";

        this.routes = {
            dashboard: "dashboard.html",
            explore: "explore.html",
            messages: "messages.html",
            profile: "profile.html",
            wallet: "wallet.html",
            creatorstudio: "creatorstudio.html",
            livestream: "livestream.html",
            marketplace: "marketplace.html",
            mentorship: "mentorship.html",
            emergency: "emergency.html",
            caregigs: "care-gigs.html",
            paytopup: "pay-topup.html",
            crosspost: "cross-post.html",
            tagged: "tagged.html",
            resume: "resume.html",
            analytics: "analytics.html",
            saved: "saved.html",
            adminDashboard: "admin-dashboard.html",
            adminUsers: "admin-users.html",
            adminReports: "admin-reports.html",
            accessibility: "accessibility-center.html"
        };

        this.protectedRoutes = [
            "wallet.html",
            "creatorstudio.html",
            "analytics.html",
            "admin-dashboard.html",
            "admin-users.html",
            "admin-reports.html"
        ];

        this.adminRoutes = [
            "admin-dashboard.html",
            "admin-users.html",
            "admin-reports
