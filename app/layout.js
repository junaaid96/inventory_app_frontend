import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Product Inventory",
    description: "Product Inventory",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="autumn">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <UserProvider>
                    <NavBar />
                    {children}
                    <Footer />
                </UserProvider>
            </body>
        </html>
    );
}
