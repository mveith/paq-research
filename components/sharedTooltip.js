function SharedTooltip({week, lines}) {
    return (<div className="tooltip-content" style={{
        background: "rgba(255,255,255,0.6)",
        minWidth: "max-content",
        whiteSpace: "nowrap",
        padding: "10px",
        border: "1px solid black",
        fontSize: "small"
    }}>
        <div key={"header_multi"} style={{
            fontWeight: "bold",
            borderBottom: "thin solid black",
            marginBottom: "10px",
            textAlign: "center"
        }}>
            {`${week}. vlna:`}
        </div>
        {lines.map((l, i) => <div key={`tooltip_line_${i}`} style={{ position: "relative", display: "block", textAlign: "left" }}>
            <p
                key={`tooltip_color_${i}`}
                style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: l.color,
                    display: "inline-block",
                    position: "absolute",
                    top: "8px",
                    left: "0",
                    margin: "0"
                }}
            />
            <p
                key={`tooltip_p_${i}`}
                style={{ display: "inline-block", margin: "0 5px 0 15px" }}
            >{`${l.title} =`}</p>
            <p key={`tooltip_p_val_${i}`} style={{ display: "inline-block", fontWeight: "bold", margin: "0" }}>
                {`${l.lineValues[week - 1]} %`}
            </p>
        </div>)}
    </div>);
}

export default SharedTooltip;