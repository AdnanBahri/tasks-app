export const converterDate = (date) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-FR", options).format(date);
};

export const shortDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
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

export const shallowEqual = (task1, task2) => {
  return (
    task1.title === task2.title &&
    task1.category_name === task2.category_name &&
    task1.desc === task2.desc &&
    task1.priority === task2.priority &&
    new Date(task1.due_date) - new Date(task2.due_date) === 0
  );
};
