"use client";
import ContentAnimation from '@/src/components/layouts/content-animation';
import Footer from '@/src/components/layouts/footer';
import Header from '@/src/components/layouts/header';
import MainContainer from '@/src/components/layouts/main-container';
import Overlay from '@/src/components/layouts/overlay';
import ScrollToTop from '@/src/components/layouts/scroll-to-top';
import Setting from '@/src/components/layouts/setting';
import Sidebar from '@/src/components/layouts/sidebar';
import Portals from '@/src/components/portals';
import { IRootState } from '@/src/store';
import { useSelector } from 'react-redux';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const primaryColor = useSelector((state: IRootState)=> state.themeConfig.primaryColor);
    const backgroundColor = useSelector((state:IRootState) => state.themeConfig.backgroundColor)

    return (
        <>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative">
                <Overlay />
                <ScrollToTop />

                {/* BEGIN APP SETTING LAUNCHER */}
                <Setting />
                {/* END APP SETTING LAUNCHER */}

                <MainContainer>
                    {/* BEGIN SIDEBAR */}
                    <Sidebar />
                    {/* END SIDEBAR */}
                    <div className="main-content flex min-h-screen flex-col" style={{backgroundColor: backgroundColor,color:primaryColor}}>
                        {/* BEGIN TOP NAVBAR */}
                        <Header />
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <ContentAnimation>{children}</ContentAnimation>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER */}
                        <Footer />
                        {/* END FOOTER */}
                        <Portals />
                    </div>
                </MainContainer>
            </div>
        </>
    );
}
