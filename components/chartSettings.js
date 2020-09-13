import { useState } from 'react';

function GroupButton({ currentGroup, group, index, onChange }) {
    return (<>
        <button style={{ cursor: "pointer", backgroundColor: "transparent", border: "0", display: "inline-flex", flexDirection: "column", opacity: currentGroup === index ? "1" : 0.4, width: "135px", margin: "0rem .3rem", textAlign: "center", fontSize: ".9rem" }} onClick={onChange} className="noselect">
            <img src={`category-images/${group.image}`} width="60" style={{ margin: "0 auto", opacity: .4 }} />
            <span style={{ textAlign: "center", width: "100%" }}>{group.title}</span>
        </button>
    </>);
}

function Tab({ title, onClick, isActive }) {
    return (<li className={"tab" + (isActive ? " tab-active" : "")}>
        <a href="javascript:void(0);" onClick={e => onClick()}>{title}</a>
    </li>);
}

function GroupButtons({ groups, onGroupChange, group }) {
    return (<div className="group-buttons">
        {groups.map((g, i) =>
            <GroupButton key={`group-button-${i}`} currentGroup={group} group={g} index={i} onChange={_ => onGroupChange(i)} />
        )}
    </div>);
}

function GroupDropdown({ groups, onGroupChange, group }) {
    const [open, setOpen] = useState(false);
    const selectedGroup = groups[group];

    const itemStyle = { backgroundColor: "transparent", border: "0", width: "100%", display: "inline-flex", flexDirection: "row", opacity: "1", fontSize: ".9rem" }
    const item = (group, index) => {
        return (<a style={itemStyle} onClick={e => { onGroupChange(index); setOpen(false); }}>
            <img src={`category-images/${group.image}`} width="60" style={{ margin: "0 1em", opacity: .4, width: "60px", flexShrink: "0" }} />
            <span style={{ margin: "auto 0" }}>{group.title}</span>
        </a>);
    };

    return (<>
        <div className="group-dropdown" style={{ border: "1px solid black", borderRadius: ".25rem", margin: "1em 0" }}>
            <button style={itemStyle} onClick={e => setOpen(!open)}>
                <img src={`category-images/${selectedGroup.image}`} width="60" style={{ margin: "0 1em", opacity: .4 }} />
                <span style={{ margin: "auto 0" }}>{selectedGroup.title}</span>
                <span style={{ margin: "auto 0", flexGrow: 1, textAlign: "right" }}><span style={{ margin: "auto 0", display: "inline-block", borderTop: ".3em solid", borderRight: ".3em solid transparent", borderBottom: "0", borderLeft: ".3em solid transparent" }}></span></span>
            </button>
            {open && <div class="dropdown-content">
                <hr style={{ margin: "0 2%" }} />
                {groups.map((g, i) => item(g, i))}
            </div>}
        </div>
    </>);
}

export default function ChartSettings({ dataProps, total, onTotalChange, group, onGroupChange }) {
    return (<>
        <div style={{ borderBottom: "1px solid #273E47", marginTop: "2rem" }}>
            <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
                <Tab title="Souhrnné zobrazení" onClick={() => onTotalChange(true)} isActive={total} />
                <Tab title="Jak si vedou různé skupiny obyvatel?" onClick={() => onTotalChange(false)} isActive={!total} />
            </ul>
        </div>
        {!total && <GroupButtons groups={dataProps.groups} onGroupChange={onGroupChange} group={group} />}
        {!total && <GroupDropdown groups={dataProps.groups} onGroupChange={onGroupChange} group={group} />}
    </>);
}
