import styles from './carousel.module.css'
import { useState, useEffect } from 'react';

function PreviousButton({ onClick }) {
    return (<a className={styles.carouselButton} style={{ left: 0 }} onClick={onClick}>
        <span style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='gray' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");" }}></span>
    </a>);
}

function NextButton({ onClick }) {
    return (<a className={styles.carouselButton} style={{ right: 0 }} onClick={onClick}>
        <span style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='gray' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");" }}></span>
    </a>);
}

export default function Carousel({ contents }) {
    const [contentIndex, setContentIndex] = useState(Math.floor(Math.random() * contents.length));
    return (
        <div style={{ position: "relative" }}>
            <PreviousButton onClick={e => setContentIndex(contentIndex === 0 ? contents.length - 1 : (contentIndex - 1))} />
            <p dangerouslySetInnerHTML={{ __html: contents[contentIndex] }} style={{ padding: "0 20px" }}></p>
            <NextButton onClick={e => setContentIndex((contentIndex + 1) % contents.length)} />
        </div>);
}