import Link from "next/link";

const AllLists = ({ lists }) => {
  const liClasses =
    "py-0 px-4 transition ease duration-200 hover:text-honey-yellow";

  return (
    <ul className="text-center">
      {lists.map((list, i) => (
        <Link key={i} href={`lists/${list._id}`}>
          <a>
            <li className={liClasses}>{list.title}</li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default AllLists;
