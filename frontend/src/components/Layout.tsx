import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />

    <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">
        {children}
    </main>
    </div>
);
}