import { Metadata } from "next";

export const metadata: Metadata ={
    title: "About Us | Name of Website",
    description: "Keywords go here",
    keywords:"About, company, ai, saas, hair"
}

export default function about(){
    return (
        <div className="flex min-h-screen dark:bg-black justify-center ">
            <p className="dark:text-zinc-50">Hello there! This is the about page</p>
        </div>

    );
}