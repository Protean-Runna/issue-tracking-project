import * as React from 'react';
import { Spinner } from '@radix-ui/themes';

//Use this for all loading pages

export const Loader = () => {

    return (
        <div className=" flex justify-center ">
            
            <h1 className='mr-4'>Loading</h1>
            <Spinner size={"3"} />
        </div>
    )
}