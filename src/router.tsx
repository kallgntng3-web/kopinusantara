import RootLayout from "./components/RootLayout";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminReservations from "./pages/admin/AdminReservations";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminPages from "./pages/admin/AdminPages";
import NotFound from "./pages/NotFound";

export const routers = [
  {
    // Layout route: no path, wraps all routes for scroll-to-top behaviour
    element: <RootLayout />,
    children: [
      { path: "/",                    name: "home",                element: <Index /> },
      { path: "/menu",                name: "menu",                element: <MenuPage /> },
      { path: "/admin",               name: "admin-login",         element: <AdminLogin /> },
      { path: "/admin/dashboard",     name: "admin-dashboard",     element: <AdminDashboard /> },
      { path: "/admin/menu",          name: "admin-menu",          element: <AdminMenu /> },
      { path: "/admin/reservations",  name: "admin-reservations",  element: <AdminReservations /> },
      { path: "/admin/messages",      name: "admin-messages",      element: <AdminMessages /> },
      { path: "/admin/pages",         name: "admin-pages",         element: <AdminPages /> },
      /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
      { path: "*",                    name: "404",                  element: <NotFound /> },
    ],
  },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
