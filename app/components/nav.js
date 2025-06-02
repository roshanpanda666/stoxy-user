import React from 'react'
import Link from 'next/link';
const Nav = () => {
    return (
        <div>
            <div className='flex justify-end item-center gap-10 mr-4'>
                <div>
                    my-orders
                </div>
                {/* add a favicon here  */}
                <Link href='/profile'>
                    <div>
                        profile
                    </div>
                </Link>
                
            </div>
        </div>
    )
}

export default Nav
