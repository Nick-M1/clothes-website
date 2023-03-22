import '../../styles/globals.css'
import Banner from "../../components/headers/Banner";
import SideOver from "../../components/product_views/SlideOver";
import TempBanner from "../../components/headers/TempBanner";
import Footer from "../../components/footers/Footer";
import AddItemToBasket from "../../components/product_views/AddItemToBasket";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth";


export default async function Layout({children}: { children: React.ReactNode }) {
    const sessionAuth = await getServerSession(authOptions)

    return (
        <>
            <SideOver/>
            {/*<div>*/}
                <div className="z-10 absolute w-full"><Banner sessionAuth={sessionAuth}/></div>
                <div className="z-20 absolute w-full"><TempBanner/></div>
                <div className="z-20"><AddItemToBasket/></div>
                <div className="-z-20 pt-20">
                    {children}
                </div>

                <Footer/>
            {/*</div>*/}
        </>
    )
}