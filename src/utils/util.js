export const converterDate = (date) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-FR", options).format(date);
};

export const sortByDate = (array, newest, sonner, query) => {
  let filteredData = array;
  console.log(filteredData);

  if (query.trim() !== "") {
    filteredData = filteredData.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.desc.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (sonner)
    return filteredData.sort(
      (a, b) => new Date(a.due_date) - new Date(b.due_date)
    );
  return filteredData.sort((a, b) =>
    newest
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at)
  );
};
