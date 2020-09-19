import getMenu from '../components/menuBuilder'
import Layout from '../components/layout';

export default function About({ menu }) {
    function Person(name, items) {
        return (<p>
            <strong>{name}</strong>
            <ul>
                {items}
            </ul>
        </p>);
    }

    return (
        <Layout title="Kontakty" menuItemsData={menu}>
            <h1 style={{ marginBottom: "3rem" }}>Kontakty</h1>

            {Person("Daniel Prokop", [<li><a href="mailto:prokop@paqresearch.cz">prokop@paqresearch.cz</a>, <a href="tel:+420 608 333 902">+420 608 333 902</a></li>, <li>kontakt s médii, konzultace ohledně výsledků výzkumu</li>])}
            {Person("Lucie Marková", [<li><a href="mailto:lucie.markova@paqresearch.cz">lucie.markova@paqresearch.cz</a></li>, <li>dotazy ohledně organizace projektu, dotazovacího nástroje</li>])}
            {Person("Jana Cahlíková", [<li>afiliace: Max Planck Institute for Tax Law and Public Finance</li>, <li>spolutvůrkyně dotazníku, tematická sekce ekonomiky a stresu</li>, <li><a href="mailto:jana.cahlikova@tax.mpg.de">jana.cahlikova@tax.mpg.de</a></li>])}
            {Person("Vojtěch Bartoš", [<li>afiliace: University of Munich</li>, <li>spolutvůrce dotazníku, tematická sekce ekonomiky a stresu</li>, <li><a href="mailto:vojtech.bartos@econ.lmu.de">vojtech.bartos@econ.lmu.de</a></li>])}
            {Person("Julie Chytilová", [<li>afiliace: IES FSV UK a CERGE-EI</li>, <li>spolutvůrkyně dotazníku</li>, <li><a href="mailto:julie.chytilova@fsv.cuni.cz">julie.chytilova@fsv.cuni.cz</a></li>])}
            {Person("Michal Bauer", [<li>afiliace: CERGE-EI a IES FSV UK</li>, <li>spolutvůrce dotazníku</li>, <li><a href="mailto:bauer@cerge-ei.cz">bauer@cerge-ei.cz</a></li>])}
            {Person("Kristína Zákopčanová", [<li><a href="https://github.com/mveith/paq-research">grafický návrh a vizualizace dat</a></li>, <li><a href="https://www.linkedin.com/in/kristina-zakopcanova/?originalSubdomain=cz">LinkedIn</a>, <a href="mailto:zakopcanova.k@gmail.com">zakopcanova.k@gmail.com</a></li>])}
            {Person("Miroslav Veith", [<li><a href="https://github.com/mveith/paq-research">vývoj webové aplikace</a></li>])}

            <br />
            <a href="https://www.paqresearch.cz/"><img src="logo-paq.png" width="120" /></a>
            <p>PAQ - Prokop Analysis and Quantitative Research, s.r.o.<br />
            Vršovická 817/5, Praha 10 - 101 00<br />
            IČ 08466912
            </p>
        </Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            menu: await getMenu()
        }
    };
}
