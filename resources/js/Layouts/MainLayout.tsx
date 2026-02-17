import { ReactNode } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import CurvedPathBackground from "@/Components/CurvedPathBackground";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <CurvedPathBackground />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
