import { AboutContent } from "./content/about/AboutContent";
import { ContactContent } from "./content/contact/ContactContent";
import { MainContent } from "./content/main/MainContent";
import { WorkContent } from "./content/work/WorkContent";
import { Header } from "./header/Header";
import MainPageStyles from "./styles/MainPage.module.scss";

export function MainPage() {
    return <>
        <Header/>

        <main
            className={MainPageStyles.Content}
        >
            <MainContent/>
            <AboutContent/>
            <WorkContent/>
            <ContactContent/>
        </main>
    </>
}