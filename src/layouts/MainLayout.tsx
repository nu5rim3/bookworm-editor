import Navigation from "@/components/custom/Navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/themeProvider"
import { Moon, Sun } from "lucide-react"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
    const { theme, toggleTheme } = useTheme()
    return (
        <main className="w-full h-screen flex flex-row relative">
            <Navigation />
            <section className="w-screen flex flex-col">
                <header className="flex h-16 w-full border-b">
                    <div className="flex items-center justify-end w-full px-5 gap-2">
                        <Button onClick={toggleTheme} variant={'ghost'} className="rounded-full p-2">{theme === 'dark' ? <Sun /> : <Moon />}</Button>
                        <Button variant={'ghost'} className="rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell-dot"><path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /><circle cx="18" cy="8" r="3" className="text-red-500" /></svg>
                        </Button>
                    </div>
                </header>
                <div className="flex p-5 ml-16">
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default MainLayout

