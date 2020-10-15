function LegendItem({ color, title, description, smallItem, onHover, onMouseOut, opacity }) {
    const style = smallItem ? { fontSize: "0.9rem" } : {};
    return (<li onMouseOver={_ => onHover(_)} onMouseOut={_ => onMouseOut(_)} style={{ opacity: opacity }}>
        <h2 className="legend-title" style={{ ...style, color: color }}>{title}</h2>
        <div className="legend-description" dangerouslySetInnerHTML={{ __html: description }}></div>
    </li>);
}

export default function Legend(props) {
    const title = props.title ? <h2 className="legend-title">{props.title}</h2> : <></>;
    const smallLegend = props.items.length > 10;
    return (
        <div className="legend">
            {props.highlightingEnabled && <span style={{ fontSize: "0.8rem", color: "#7C8A92" }}>pro zvýraznění jednotlivých kategorií, najeďte na název kategorie</span>}
            {title}
            <ul style={{ listStyle: "none", flexBasis: "20%", paddingLeft: "0" }}>
                {props.items.map((item, i) =>
                    <LegendItem
                        {...item}
                        key={`legend-item-${i}`}
                        smallItem={smallLegend}
                        onHover={_ => props.onHover(i)}
                        onMouseOut={_ => props.onHover()}
                        opacity={props.highlightedLineIndex !== undefined ? (props.highlightedLineIndex === i ? 1 : 0.5) : 1}
                    />)}
            </ul>
        </div>);
}
