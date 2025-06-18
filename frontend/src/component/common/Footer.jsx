const FooterComponent = () => {


    return (
        <footer className="bg-gray-400 text-black py-4">
        <div className="container mx-auto text-center">
            <span className="text-md">
                 Hotel Sanket | All Rights Reserved &copy; {new Date().getFullYear()}
            </span>
        </div>
    </footer>
    
    );
};

export default FooterComponent;
