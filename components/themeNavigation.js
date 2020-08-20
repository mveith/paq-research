import Link from 'next/link';

function ThemeNavigation({ previousHref, previousTitle, nextHref, nextTitle }) {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
                <Link href={previousHref}>
                    <a>
                        <span>🠐</span><br />
                        <span>Předchozí téma</span><br />
                        <span>{previousTitle}</span>
                    </a>
                </Link>
            </div>
            <div>
                <Link href={nextHref}>
                    <a>
                        <span>🠒</span><br />
                        <span>Další téma</span><br />
                        <span>{nextTitle}</span>
                    </a>
                </Link>
            </div>
        </div>);
}

export default ThemeNavigation;