export interface Bookmark {
    text: string;
    contentId: string;
    note?: string;
}

export interface Content {
    title: string;
    contentId: string;
    chapterIdBookmarked?: string;
    bookTitle?: string;
}

export interface Highlight {
    bookmark: Bookmark;
    content: Content;
}
