import { motion, useAnimationControls } from 'framer-motion'
import { LayoutDashboard, User, Settings, BookMarked, LibraryBig, BadgeDollarSign, Sun, Moon } from 'lucide-react'
import { useEffect } from 'react'
import { Nav } from './Nav'
import { Button } from '../ui/button'
import { useTheme } from '../../context/themeProvider'
import fullLogoW from '../../assets/Group 7.png';
import fullLogo from '../../assets/Group 10.png';
import smallLogo from '../../assets/Group 12.png';

const containerVariants = {
    close: {
        width: "4rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.1,
        },
    },
}

const svgVariants = {
    close: {
        rotate: 360,
    },
    open: {
        rotate: 180,
    },
}

const Navigation = () => {
    const { theme, toggleTheme, isMinimized, setIsMinimized } = useTheme()

    const containerControls = useAnimationControls()
    const svgControls = useAnimationControls()

    useEffect(() => {
        if (isMinimized) {
            containerControls.start("open")
            svgControls.start("open")
        } else {
            containerControls.start("close")
            svgControls.start("close")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMinimized])

    const handleOpenClose = () => {
        setIsMinimized()
    }

    return (

        <motion.aside
            variants={containerVariants}
            animate={containerControls}
            initial="close"
            className="bg-background flex flex-col z-10 absolute top-0 left-0 h-full shadow shadow-neutral-600 py-3"
        >
            <div className='absolute -right-3 top-10 cursor-pointer rounded-full border bg-background text-3xl text-foreground'>
                <button
                    className="p-1 rounded-full flex"
                    onClick={() => handleOpenClose()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={svgVariants}
                            animate={svgControls}
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                            }}
                        />
                    </svg>
                </button>
            </div>

            <div className='flex justify-center px-2 whitespace-nowrap'>
                {isMinimized ?
                    <>
                        <img src={fullLogo} className='dark:hidden' />
                        <img src={fullLogoW} className='hidden dark:block' />
                    </>
                    :
                    <div className="w-10 h-10">
                        <img src={smallLogo} />
                    </div>
                }
            </div>
            <Nav
                isCollapsed={!isMinimized}
                setIsMinimized={setIsMinimized}
                links={[
                    {
                        title: "Dashboard",
                        label: "",
                        icon: LayoutDashboard,
                        variant: "ghost",
                        path: '/dashboard'
                    },
                    {
                        title: "Book",
                        label: "",
                        icon: BookMarked,
                        variant: "ghost",
                        path: '/book'
                    },
                    {
                        title: "Books Shell",
                        label: "9",
                        icon: LibraryBig,
                        variant: "ghost",
                        path: '/books-shell'
                    },
                    {
                        title: "Profile",
                        label: "1",
                        icon: User,
                        variant: "ghost",
                        path: '/profile'
                    },
                    {
                        title: "Revenue",
                        label: "100",
                        icon: BadgeDollarSign,
                        variant: "ghost",
                        path: '/revenue'
                    },
                    {
                        title: "Settings",
                        label: "2",
                        icon: Settings,
                        variant: "ghost",
                        path: '/settings'
                    },
                ]}
            />
            <div className='flex flex-1 justify-center items-end'>
                <Button onClick={toggleTheme} variant={'ghost'}>{theme === 'dark' ? <Sun /> : <Moon />}</Button>
            </div>
        </motion.aside>

    )
}

export default Navigation