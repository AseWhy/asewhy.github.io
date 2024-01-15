import { AboutContent } from "./content/about/AboutContent";
import { ContactContent } from "./content/contact/ContactContent";
import { MainContent } from "./content/main/MainContent";
import { WorkContent } from "./content/work/WorkContent";
import { Header } from "./header/Header";

import MainPageModule from "./MainPage.module.scss";

export function MainPage() {
    return <>
        <Header/>

        <main
            className={MainPageModule.Content}
        >
            <MainContent/>
            <AboutContent/>
            <WorkContent/>
            <ContactContent/>
        </main>
    </>
}