import Header from "../Header";
import Footer from '../Footer';


export default function LayoutWithHeaderFooter({ children }) {
   
    return (
        <>
            <Header />
           
                

                {children}
                <Footer/>
            

        </>

    )
}