import Navigation from "@/components/custom/Navigation"
import { Outlet } from "react-router-dom"



const MainLayout = () => {

    return (
        <main className="w-full h-screen flex flex-row relative">
            <Navigation />
            <section className="flex p-5 ml-16 w-full">
                <Outlet />
            </section>
        </main>
    )
}

export default MainLayout

