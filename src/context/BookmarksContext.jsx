import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BookmarksContext = createContext(null);

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage("freshfind-bookmarks", []);

  const isBookmarked = (kind, id) =>
    bookmarks.some((b) => b.kind === kind && b.id === id);

  const toggle = (kind, id) => {
    if (isBookmarked(kind, id)) {
      setBookmarks(bookmarks.filter((b) => !(b.kind === kind && b.id === id)));
    } else {
      setBookmarks([...bookmarks, { kind, id, note: "" }]);
    }
  };

  const setNote = (kind, id, note) => {
    setBookmarks(
      bookmarks.map((b) =>
        b.kind === kind && b.id === id ? { ...b, note } : b,
      ),
    );
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, isBookmarked, toggle, setNote }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarksContext);
}
