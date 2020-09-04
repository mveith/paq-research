import Link from 'next/link';

function ThemeNavigation({ previousHref, previousTitle, nextHref, nextTitle }) {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div className="button-switch-topic">
                <Link href={previousHref}>
                    <a>
                        <span>
                          <i className="fa fa-long-arrow-left" /><br />
                        </span>
                        <span style={{fontWeight: "bold"}}>Předchozí téma</span><br />
                        <span>{previousTitle}</span>
                    </a>
                </Link>
            </div>
            <div className="button-switch-topic">
                <Link href={nextHref}>
                    <a href="javascript:void(0);" className="icon">
                        <span>
                           <i className="fa fa-long-arrow-right" /><br />
                        </span>
                        <span style={{fontWeight: "bold"}}>Další téma</span><br />
                        <span>{nextTitle}</span>
                    </a>
                </Link>
            </div>
        </div>);
}

export default ThemeNavigation;