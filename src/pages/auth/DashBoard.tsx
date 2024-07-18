import { Button } from '@/components/ui/button'
import React from 'react'

const DashBoard = () => {
    return (
        <div>DashBoard
            <Button variant={'default'}>hello</Button>
            <Button variant={'destructive'}>hello</Button>
            <Button variant={'ghost'}>hello</Button>
            <Button variant={'link'}>hello</Button>
            <Button variant={'outline'}>hello</Button>
            <Button variant={'secondary'}>hello</Button>
        </div>
    )
}

export default DashBoard