exports.sort_comments = (arr, sort_by, sort_order) => {
  if (sort_by === "likes") {
    arr.sort((a, b) => {
      if (sort_order !== "asc") {
        return (
          a.likes.length -
          a.dislikes.length -
          (b.likes.length - b.dislikes.length)
        );
      }
      return (
        b.likes.length -
        b.dislikes.length -
        (a.likes.length - a.dislikes.length)
      );
    });
  }
  if (sort_by === "dislikes") {
    arr.sort((a, b) => {
      if (sort_order !== "asc") {
        return (
          a.dislikes.length -
          a.likes.length -
          (b.dislikes.length - b.likes.length)
        );
      }
      return (
        b.dislikes.length -
        b.likes.length -
        (a.dislikes.length - a.likes.length)
      );
    });
  }
  if (sort_by === "date") {
    arr.sort((a, b) => {
      if (sort_order !== "asc") {
        return a.date - b.date;
      }
      return b.date - a.date;
    });
  }
  return arr;
};
