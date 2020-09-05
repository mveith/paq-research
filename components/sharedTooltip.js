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

function SharedTooltip({ firstWeek, week, lines, nonpercentage }) {
    return (<div className="tooltip-content" style={{ background: "rgba(255,255,255,0.9)", minWidth: "max-content", whiteSpace: "nowrap", padding: "10px", border: "1px solid black", fontSize: "small" }}>
        <div key={"header_multi"} style={{ fontWeight: "bold", borderBottom: "thin solid black", marginBottom: "10px", textAlign: "center" }}>
            {`${week}. vlna:`}
        </div>
        {lines.map((l, i) => <TooltipItem color={l.color} value={l.lineValues[week - firstWeek] + (nonpercentage ? "" : "%")} index={i} />)}
    </div>);
}

export default SharedTooltip;