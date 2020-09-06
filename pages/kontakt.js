import Layout from '../components/layout';

export default function About() {
    return (
        <Layout title="Kontakty">
            <h1 style={{ marginBottom: "3rem" }}>Kontakty</h1>

            <p>PAQ - Prokop Analysis and Quantitative Research, s.r.o.<br />
            Vršovická 817/5, Praha 10 - 101 00<br />
            IČ 08466912
            </p>
            <br />
            <ul>
                <li>prokop@paqresearch.cz, +420 608 333 902</li>
                <li>dvorak@paqresearch.cz</li>
                <li>kunc@paqresearch.cz</li>
                <li>hruba@paqresearch.cz</li>
                <li>korbel@paqresearch.cz</li>
            </ul>
        </Layout>
    )
}