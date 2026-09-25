import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksContext";
import { MarketsContext } from "../../context/MarketsContext";
import { produceGuide } from "../../data/marketData";
import "./Bookmarks.css";

// Turn a saved { kind, id } into something we can display
function lookup(bookmark, markets) {
  if (bookmark.kind === "market") {
    const m = (markets || []).find((x) => x.id === bookmark.id);
    if (!m) return null;
    return {
      title: m.name,
      subtitle: `${m.neighborhood} · ${m.days.join(", ")} · ${m.hours}`,
      to: `/market/${m.id}`,
      linkLabel: "View market",
    };
  }

  // produce: for now the id is the item's name
  const p = produceGuide.find((x) => x.name === bookmark.id);
  if (!p) return null;
  return {
    title: p.name,
    subtitle: p.tip,
    to: "/produce-guide",
    linkLabel: "Open produce guide",
  };
}

// Build the plain-text list used for the export box and the copy button
function buildExportText(entries) {
  const lines = ["FreshFind - My Bookmarks", ""];
  const groups = [
    { label: "MARKETS", kind: "market" },
    { label: "PRODUCE", kind: "produce" },
  ];

  groups.forEach(({ label, kind }) => {
    const group = entries.filter((e) => e.b.kind === kind);
    if (group.length === 0) return;

    lines.push(label);
    group.forEach(({ b, info }, i) => {
      lines.push(`${i + 1}. ${info.title}`);
      lines.push(`   ${info.subtitle}`);
      if (b.note.trim()) lines.push(`   Note: ${b.note.trim()}`);
    });
    lines.push("");
  });

  return lines.join("\n");
}

export default function Bookmarks() {
  const { bookmarks, toggle, setNote } = useBookmarks();
  const { markets } = useContext(MarketsContext);
  const [copied, setCopied] = useState(false);

  // pair each bookmark with its display info, skipping any we can't find
  const entries = bookmarks
    .map((b) => ({ b, info: lookup(b, markets) }))
    .filter((e) => e.info);

  const exportText = buildExportText(entries);

  const shareText = `My FreshFind picks: ${entries.map((e) => e.info.title).join(", ")}`;
  const shareUrl = window.location.origin;
  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard can be blocked by the browser; nothing else to do
    }
  };

  return (
    <section className="page-section bookmarks-page">
      <div className="section-heading">
        <div>
          <span className="kicker">Bookmarks</span>
          <h2>Your saved markets and produce</h2>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="bookmarks-empty">
          <p>You haven't bookmarked anything yet.</p>
          <Link to="/directory" className="btn btn-primary">
            Find a market
          </Link>
        </div>
      ) : (
        <>
          <div className="bookmarks-list">
            {entries.map(({ b, info }) => (
              <div className="bookmark-card" key={`${b.kind}-${b.id}`}>
                <div className="bookmark-top">
                  <span className="bookmark-kind">
                    {b.kind === "market" ? "Market" : "Produce"}
                  </span>
                  <button
                    type="button"
                    className="bookmark-remove"
                    onClick={() => toggle(b.kind, b.id)}
                  >
                    Remove
                  </button>
                </div>

                <h3>{info.title}</h3>
                <p className="bookmark-sub">{info.subtitle}</p>
                <Link to={info.to} className="bookmark-link">
                  {info.linkLabel}
                </Link>

                <label className="bookmark-note">
                  <span>Your note</span>
                  <textarea
                    value={b.note}
                    onChange={(e) => setNote(b.kind, b.id, e.target.value)}
                    placeholder="Add a note, e.g. go early for the cheese…"
                    rows={2}
                  />
                </label>
              </div>
            ))}
          </div>

          <div className="bookmarks-export">
            <h3>Export and share</h3>

            <div className="bookmarks-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy list"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => window.print()}
              >
                Print list
              </button>
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  aria-label={`Share list on ${s.label}`}
                >
                  Share on {s.label}
                </a>
              ))}
            </div>

            <pre className="export-preview">{exportText}</pre>
          </div>
        </>
      )}
    </section>
  );
}
