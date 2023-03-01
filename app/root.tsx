import type { MetaFunction } from "@remix-run/cloudflare";
import logo from "~/logo.png";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Review Shuffle",
  "og:title": "Review Shuffle",
  viewport: "width=device-width,initial-scale=1",
  "og:image": `https://reviewShuffle.koperwas.org${logo}`,
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={'{"token": "e55bf2c093f24978ab96fa3d6be0e8a7"}'}></script>
      </body>
    </html>
  );
}
