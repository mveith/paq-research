function LegendItem({ color, title, description }) {
    return (<li>
        <h2 class="legend-title" style={{ color: color }}>{title}</h2>
        <p class="legend-description">{description}</p>
    </li>);
}

export default function Legend(props) {
    const title = props.title ? <h2 class="legend-title">{props.title}</h2> : <></>;
    return (
        <>
            {title}
            <ul style={{ listStyle: "none", flexBasis: "20%", paddingLeft: "0" }}>
                {props.items.map((item, i) => <LegendItem {...item} key={`legend-item-${i}`} />)}
            </ul>
        </>);
}
