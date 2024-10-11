import { useState } from "react";
import { weekTabs } from "../constants/tabArray";
import { useUpdateSelectedWeekMutation } from "../services/ordersApi";

const Modal = ({ isOpen, closeModal, dialogRef, selectedCards }) => {
  const [activeTab, setActiveTab] = useState(1);

  // Mutation for updating the selected week
  const [updateSelectedWeek, { isLoading: isUpdating, isError }] =
    useUpdateSelectedWeekMutation();

  // Save the selected week
  const handleSave = async () => {
    try {
      const response = await updateSelectedWeek({
        selectedCards,
        week: activeTab,
      }).unwrap();

      if (response) {
        console.log(response, "Week updated successfully");
        closeModal();
      }
    } catch (error) {
      console.error("Error updating week:", error);
    }
  };

  // Modal closing
  const handleOverlayClick = (e) => {
    // Ensure the modal closes only if the overlay is clicked
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOverlayClick}
        />
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <dialog
          ref={dialogRef}
          className="rounded-lg z-50 flex items-center justify-center"
          style={{
            display: "flex",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "550px",
          }}
        >
          <div
            className="bg-white rounded-lg shadow-lg py-6 md:py-8 w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl md:text-2xl text-dark-gray font-bold">
              Select Week
            </h2>

            {/* Week orderTabs */}
            <div className="flex flex-wrap justify-center gap-4 my-4 md:my-10">
              {weekTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 md:px-5 md:py-2 rounded-lg transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#CFECFF] text-dark-gray font-semibold"
                      : "bg-gray-200 text-dark-gray font-semibold"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Save Button */}
            <button
              className="bg-primary-blue text-sm font-semibold text-white px-10 py-2 rounded-[3px] hover:bg-opacity-90 mt-4"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>

            {isError && (
              <p className="text-red-500 mt-2 text-sm">
                Failed to update week.
              </p>
            )}
            {/* {isSuccess && (
              <p className="text-green-500 mt-2">Week updated successfully!</p>
            )} */}
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
