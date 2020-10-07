import { useState } from 'react';
import { useRouter } from 'next/router'

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

function TwitterButton({ title, url }) {
    const text = title;
    const hashtag = "ZivotBehemPandemie";
    const via = "paq_research";

    return <a href={`https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtag}&via=${via}&url=${url}`} target="_blank" className="share-button">
        <img src="share-buttons/twitter-icon.svg" />
    </a>;
}

function FacebookButton({ url }) {
    return <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" className="share-button">
        <img src="share-buttons/facebook-icon.svg" />
    </a>;
}

function LinkedinButton({ url }) {
    return <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" className="share-button">
        <img src="share-buttons/linked-in-icon.svg" />
    </a>;
}

function Filter({ label, index, onChange}) {
    return <label>
        <input type="radio" name="filters" id={`filter-${index}`} value={label} onChange={onChange} />
        {label}
    </label>;
}

function Filters({ filters, onFilterChange }) {
    return <div className="filters">
        Zobraz aktivity typu            
            {filters.map((f, i) => <Filter label={f.label} index={i} onChange={_ => onFilterChange(f.indexes)} />)}
    </div>;
}

export default function ChartSettings({ dataProps, total, onTotalChange, group, onGroupChange, title, onFilterChange }) {
    const router = useRouter();
    const url = `https://zivotbehempandemie.cz${router.asPath}`;
    return (<>
        <div className="chart-settings">
            <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
                <Tab title="Souhrnné zobrazení" onClick={() => onTotalChange(true)} isActive={total} />
                <Tab title="Jak si vedou různé skupiny obyvatel?" onClick={() => onTotalChange(false)} isActive={!total} />
            </ul>
            <div className="share-buttons">
                <TwitterButton title={title} url={url} />
                <FacebookButton url={url} />
                <LinkedinButton url={url} />
            </div>
        </div>
        {!total && <GroupButtons groups={dataProps.groups} onGroupChange={onGroupChange} group={group} />}
        {!total && <GroupDropdown groups={dataProps.groups} onGroupChange={onGroupChange} group={group} />}

        {dataProps.filters && <Filters filters={dataProps.filters} onFilterChange={onFilterChange} />}
    </>);
}
