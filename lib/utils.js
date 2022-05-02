export const getAllLists = async (query) => {
    const response = await fetch('/api/lists/all-lists', {
        method: "GET"
    })

    const { data } = await response.json()

    if (!response.ok) {
        console.log("Error loading lists!")
    }

    if (query) {
        return data.find(list => list._id === query)
    }

    return data
}