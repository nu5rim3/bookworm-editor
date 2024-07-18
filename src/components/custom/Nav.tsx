import { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"

interface NavProps {
    isCollapsed: boolean
    links: {
        title: string
        label?: string
        icon: LucideIcon
        variant: "default" | "ghost"
        path: string
    }[]
}

export function Nav({ links, isCollapsed }: NavProps) {

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <Link
                            key={index}
                            to={link.path}
                            className={cn(
                                buttonVariants({ variant: pathname === link.path ? 'default' : 'ghost', size: "sm" }),
                                "justify-start"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                        </Link>
                    ) : (
                        <Link to={link.path}>
                            <a
                                key={index}
                                href="#"
                                className={cn(
                                    buttonVariants({ variant: pathname === link.path ? 'default' : 'ghost', size: "sm" }),
                                    "w-full justify-start"
                                )}
                            >
                                <link.icon className="mr-2 h-4 w-4" />
                                {link.title}
                                {link.label && (
                                    <span
                                        className={cn(
                                            "ml-auto",
                                            link.variant === "default" &&
                                            "text-background dark:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </span>
                                )}
                            </a>
                        </Link>
                    )
                )}
            </nav>
        </div >
    )
}