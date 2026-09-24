import { createContext, useContext, useState } from "react";

const BookmarksContext = createContext(null);

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  // is this item already bookmarked?
  const isBookmarked = (kind, id) =>
    bookmarks.some((b) => b.kind === kind && b.id === id);

  // add it if it's not there, remove it if it is
  const toggle = (kind, id) => {
    if (isBookmarked(kind, id)) {
      setBookmarks(bookmarks.filter((b) => !(b.kind === kind && b.id === id)));
    } else {
      setBookmarks([...bookmarks, { kind, id, note: "" }]);
    }
  };

  // save a note on a bookmarked item
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
