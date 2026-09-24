import { useState } from "react";
import { Icon } from "../../icons";
import { produceGuide } from "../../data/marketData";
import BookmarkButton from "../../components/BookmarkButton/BookmarkButton";
import "./ProduceGuide.css";

const MONTH_LABELS = [
  "J",
  "F",
  "M",
  "A",
  "M",
  "J",
  "J",
  "A",
  "S",
  "O",
  "N",
  "D",
];

function isInSeason(season, monthIndex) {
  const [start, end] = season;
  if (start <= end) return monthIndex >= start && monthIndex <= end;
  return monthIndex >= start || monthIndex <= end; // wraps around the year
}

export default function ProduceGuide() {
  const [query, setQuery] = useState("");

  const filtered = produceGuide.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <section className="page-section produce-page">
      <div className="section-heading">
        <div>
          <span className="kicker">Produce guide</span>
          <h2>What grows when</h2>
        </div>
      </div>

      <p className="produce-intro">
        A general guide to when common fruits and vegetables are typically in
        season around Millhaven. Exact timing varies a little year to year — ask
        a vendor for the latest.
      </p>

      <label className="produce-search">
        <Icon name="search" size={16} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search produce…"
          aria-label="Search produce"
        />
      </label>

      <div className="produce-list">
        <div className="produce-list-head">
          <span>Produce</span>
          <div className="month-labels">
            {MONTH_LABELS.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {filtered.map((item) => (
          <div className="produce-row" key={item.name}>
            <div className="produce-info">
              <p className="produce-name">{item.name}</p>
              <p className="produce-tip">{item.tip}</p>
              <BookmarkButton kind="produce" id={item.name} />
            </div>
            <div className="season-bar">
              {MONTH_LABELS.map((_, i) => (
                <span
                  key={i}
                  className={`season-cell ${isInSeason(item.season, i) ? "is-active" : ""}`}
                />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="produce-empty">No produce matches "{query}".</p>
        )}
      </div>
    </section>
  );
}
