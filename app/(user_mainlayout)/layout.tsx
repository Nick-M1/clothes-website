import '../../styles/globals.css'
import {Montserrat} from "@next/font/google"
import Banner from "../../components/headers/Banner";
import SideOver from "../../components/product_views/SlideOver";
import TempBanner from "../../components/headers/TempBanner";
import Footer from "../../components/footers/Footer";
import AddItemToBasket from "../../components/product_views/AddItemToBasket";
// import DarkmodeInitialiser from "../../components/DarkmodeInitialiser.tsx.txt";


export default function Layout({ children }: { children: React.ReactNode}) {

    return(
        <div >
            {/*<DarkmodeInitialiser/>*/}

            <div className="z-10 absolute w-full"><Banner/></div>
            <div className="z-20 absolute w-full"><TempBanner/></div>
            <div className="z-20"><AddItemToBasket/></div>

            <div className="z-30"><SideOver/></div>
            <div className="-z-20 py-20">
                {children}
            </div>

            <Footer/>
        </div>
    )
}