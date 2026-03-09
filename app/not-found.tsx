// this page can customise the 404 not found page.

export default function NotFoundPage(){
    return (
        <div style={{textAlign:"center", padding:"50px",}}>
            <h1 className="text-red-500 text-5xl m-2">404 - Not Found!</h1>
            <p className="text-2xl m-2">The page you're looking for cannot be found</p>
            <a href="/" className="text-blue-300 hover:text-blue-700 underline">Return Home</a>
        </div>
    );
}