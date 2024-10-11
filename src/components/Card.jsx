import { useDeleteSelectedWeekMutation } from "../services/ordersApi";
import { toast } from "react-toastify";

function Card({
  id,
  activeTab,
  imageSrc,
  title,
  description,
  cuisine,
  rating,
  mealType,
}) {
  // Mutation for deleting the selected week
  const [deleteSelectedWeek] = useDeleteSelectedWeekMutation();

  //Save the selected week
  const handleDelete = async (id) => {
    try {
      const response = await deleteSelectedWeek({
        id,
        week: activeTab.split(" ")[1],
      }).unwrap();

      if (response) {
        console.log(response, `Recipes from ${activeTab} deleted successfully`);
        toast.success(`Recipes from ${activeTab} deleted successfully`, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(`Error deleting recipes from ${activeTab}:`, error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="relative">
        <img
          src={imageSrc}
          alt="Card Image"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div
          className={`w-full absolute top-2 flex items-center px-2 ${
            activeTab !== "All Meals" ? "justify-between" : "justify-end"
          }`}
        >
          {/* Delete Icon */}
          {activeTab !== "All Meals" && (
            <div
              className="bg-red-100 p-1 cursor-pointer"
              onClick={() => handleDelete(id)}
            >
              <svg
                className="w-5 h-5 text-red-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </div>
          )}
          {/* Meal Type */}
          <div className="bg-black px-6 rounded-[3px] p-[1px] text-white text-[0.6rem]">
            {mealType?.join(" , ")}
          </div>
        </div>
      </div>

      <h1 className="text-xl capitalize text-dark-gray font-extrabold mb-2">
        {title}
      </h1>
      <p className="text-gray-600 mb-4 text-[0.8rem]">
        {description?.join(" ").substring(0, 300)}
      </p>

      <div className="flex justify-between items-center">
        <div>
          <span className="font-extrabold text-dark-gray text-[0.8rem]">
            Cuisine:
          </span>
          <span className="text-dark-gray font-semibold ml-1 text-[0.8rem]">
            {cuisine}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-extrabold text-dark-gray text-[0.8rem]">
            Rating:
          </span>
          <span className="text-dark-gray font-semibold ml-1 text-[0.8rem]">
            {rating}
          </span>
          <div className="ml-2 text-primary-blue flex gap-[2px]">
            {/* Filled stars */}
            {Array(Math.floor(rating))
              .fill()
              .map((_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.54L.489 6.905l6.56-.954L10 .5l2.95 5.451 6.56.954-4.755 4.645 1.122 6.54z" />
                </svg>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
