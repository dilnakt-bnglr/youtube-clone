import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import { store } from "../Store/store.js";

function Layout() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="pt-16">
          <div className="flex min-h-[calc(100vh-64px)]">
            <aside className="hidden sm:flex">
              <Sidebar />
            </aside>
            <section className="w-full">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default Layout;
