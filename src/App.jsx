import { useRef, useState } from "react";
import { Card, Loader, Modal } from "./components";
import { heroBgImage } from "./assets/images";
import { useOrdersQuery } from "./services/ordersApi";
import { orderTabs } from "./constants/tabArray";

function App() {
  const [activeTab, setActiveTab] = useState("All Meals");
  const { data, isLoading } = useOrdersQuery(activeTab);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const dialogRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  // Handle selecting/unselecting a card
  const toggleCardSelection = (id) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(id)) {
        // Unselect card
        return prevSelectedCards.filter((cardId) => cardId !== id);
      } else {
        // Select card
        return [...prevSelectedCards, id];
      }
    });
  };

  return (
    <section>
      {/* Hero section */}
      <div
        className="relative w-full h-[35vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-dark-gray px-4">
          <h1 className="text-[2rem] sm:text-[2.8rem] text-dark-gray font-bold mb-2">
            Optimize Your Meal
          </h1>
          <p className="text-sm text-dark-gray">
            Select Meal to Add in Week. You will be able to edit, modify, and
            change the Meal Weeks.
          </p>
        </div>
      </div>
      {/* Orders Section */}
      <div className="bg-gradient-to-r from-light-peach via-light-pink to-light-blue min-h-screen">
        <h1 className="max-w-6xl mx-auto text-center md:text-left text-2xl text-dark-gray font-bold py-6">
          Week Orders
        </h1>

        {/* orderTabs */}
        <div className="bg-white py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center">
              {orderTabs.map((tab) => (
                <button
                  key={tab}
                  className={`text-sm text-dark-gray font-bold pb-2 px-3 md:px-10 border-b-4 ${
                    activeTab === tab
                      ? "text-primary-blue border-primary-blue"
                      : "text-dark-gray border-transparent"
                  } hover:text-primary-blue`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}

              {/* Add to Week Button */}
              <button
                className={`bg-primary-blue text-sm font-semibold text-white px-5 md:px-9 py-2 rounded-sm hover:bg-opacity-90 ${
                  selectedCards.length === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : ""
                }`}
                onClick={openModal}
                disabled={selectedCards.length === 0}
              >
                Add to Week
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto px-3 mt-6 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {isLoading ? (
            <Loader />
          ) : (
            data?.map((order) => (
              <div
                key={order._id}
                className={`border-2 rounded-md cursor-pointer ${
                  selectedCards.includes(order._id)
                    ? "border-primary-blue"
                    : "border-transparent"
                }`}
                onClick={() => toggleCardSelection(order._id)}
              >
                <Card
                  id={order._id}
                  imageSrc={order.image}
                  title={order.name}
                  description={order.instructions}
                  cuisine={order.cuisine}
                  rating={order.rating}
                  mealType={order.mealType}
                  activeTab={activeTab}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Add to Week Modal */}
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        dialogRef={dialogRef}
        selectedCards={selectedCards}
      />
    </section>
  );
}

export default App;
