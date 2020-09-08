export function GroupButton({ currentGroup, group, index, onChange }) {
    const id = `group-${index}`;
    return (<>
        <label htmlFor={id} style={{ cursor: "pointer" }} >
            <input type="radio" id={id} name={id} value={id} checked={currentGroup === index} onChange={onChange} style={{ appearance: "none", MozAppearance: "none", WebkitAppearance: "none" }} />
            <span style={{ display: "inline-flex", flexDirection: "column", opacity: currentGroup === index ? "1" : 0.4, width: "135px", margin: "0rem .3rem", textAlign: "center", fontSize: ".9rem" }} className="noselect">
                <img src={group.image} width="60" style={{ margin: "0 auto", opacity: .4 }} />
                {group.title}
            </span>
        </label>
    </>);
}

export default function ChartSettings({ dataProps, total, onTotalChange, group, onGroupChange }) {
    return (<>
        <div style={{ borderBottom: "1px solid #273E47", marginTop: "2rem" }}>
            <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
                <li className={"tab" + (total ? " tab-active" : "")}>
                    <a href="javascript:void(0);" onClick={e => onTotalChange(true)}>Souhrnné zobrazení</a>
                </li>
                <li className={"tab" + (!total ? " tab-active" : "")}>
                    <a href="javascript:void(0);" onClick={e => onTotalChange(false)}>Jak si vedou různé skupiny obyvatel?</a>
                </li>
            </ul>
        </div>
        {!total && <div style={{ display: "flex", flexDirection: "row", margin: "20px 0", flexWrap: "wrap" }}>
            {dataProps.groups.map((g, i) => <GroupButton currentGroup={group} group={g} index={i} onChange={_ => onGroupChange(i)} />)}
        </div>}
    </>);
}
