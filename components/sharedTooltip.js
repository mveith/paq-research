function TooltipItem({ color, value, index }) {
    return (<div key={`tooltip_line_${index}`} style={{ position: "relative", display: "block", textAlign: "left" }}>
        <p
            key={`tooltip_color_${index}`}
            style={{ width: "10px", height: "10px", backgroundColor: color, display: "inline-block", position: "absolute", top: "8px", left: "0", margin: "0" }}
        />
        <p key={`tooltip_p_val_${index}`} style={{ display: "inline-block", fontWeight: "bold", margin: "0 5px 0 15px", fontSize: "0.8rem" }}>
            {value}
        </p>
    </div>);
}

function SharedTooltip({ firstWeek, week, lines, nonpercentage, ticks }) {
    return (<div className="tooltip-content">
        <div key={"header_multi"} style={{ fontWeight: "bold", borderBottom: "thin solid black", marginBottom: "10px", textAlign: "center" }}>
            {`${ticks[week - firstWeek]}:`}
        </div>
        {lines.filter(l => l.lineValues[week - firstWeek] !== null).map((l, i) => <TooltipItem color={l.color} value={l.lineValues[week - firstWeek] + (nonpercentage ? "" : "%")} index={i} />)}
    </div>);
}

export default SharedTooltip;