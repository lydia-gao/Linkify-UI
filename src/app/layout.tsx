import { ReduxProvider } from "../components/providers/ReduxProvider";
import "../styles/globals.css";

export const metadata = {
  title: "Linkify - Link Management Platform",
  description: "Manage and track your links with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
