import { useBookmarks } from "../../context/BookmarksContext";
import "./BookmarkButton.css";

export default function BookmarkButton({ kind, id }) {
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(kind, id);

  return (
    <button
      type="button"
      className={`bookmark-btn ${saved ? "is-active" : ""}`}
      onClick={() => toggle(kind, id)}
      aria-pressed={saved}
    >
      {saved ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
