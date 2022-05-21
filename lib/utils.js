export const getAllLists = async (query) => {
  const response = await fetch("/api/lists/all-lists", {
    method: "GET",
  });

  const { data } = await response.json();

  if (!response.ok) {
    console.log("Error loading lists!");
    return [];
  }

  if (data === "No Lists Found") {
    return "No Lists Found";
  }

  if (query) {
    return data.find((list) => list._id === query);
  }

  return data;
};

export const updateListInDb = async (selectedList, listItems) => {
  const response = await fetch("/api/lists/update-list", {
    body: JSON.stringify({
      selectedList: selectedList,
      listItems: listItems,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.message);
  }

  return data;
};
