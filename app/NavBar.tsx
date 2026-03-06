'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";

const NavBar = () =>{

    const links = [
        {label: 'About', href:'/about'},
        {label: 'Issues', href:'/issues'},
        {label: 'Dashboard', href:'/dashboard'},
        
    ]
    const currentPath = usePathname();
    console.log(currentPath);

    return(
        <nav className="flex bg-black space-x-6 px-5 border-b h-14 items-center">
          {" "}
          <Link href={"/"}>🏠</Link>
          <ul className="flex space-x-6">
            {links.map(link =>
                <Link
                key={link.href}
                className={
                    `
                    hover:text-amber-500  
                      transition-colors
                      ${link.href === currentPath ? 'text-amber-300' : 'text-zinc-50'

                    }`}
                href={link.href}
                >{link.label}</Link>
            )} 
          </ul>
        </nav>
    );

}

export default NavBar