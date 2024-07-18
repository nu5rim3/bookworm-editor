import { Outlet } from 'react-router-dom'

const UnAuthLayout = () => {
    return (
        <main>
            <>
                <Outlet />
            </>
            <footer className='flex flex-1 justify-center bg-primary/10'>bookworm copyrights 2024</footer>
        </main>
    )
}

export default UnAuthLayout