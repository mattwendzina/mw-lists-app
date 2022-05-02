const SelectedList = ({ list }) => (
    <ul>
        {list?.items.map((list, i) => (
            <li key={i}>
                {list.name}
            </li>
        ))}
    </ul>
)

export default SelectedList