
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!"); // Check if script is running

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            console.log("Delete button clicked!"); // Check if button works

            const bookId = button.getAttribute("data-id");
            if (!bookId) {
                console.error("No book ID found!");
                return;
            }

            if (confirm("Are you sure you want to delete this book?")) {
                try {
                    const res = await fetch(`/books/${bookId}`, { 
                        method: "DELETE" 
                    });

                    console.log("Server response:", res.status); // Debugging

                    if (res.ok) {
                        document.getElementById(`book-${bookId}`).remove(); // Remove from UI
                    } else {
                        alert("Error deleting book");
                    }
                } catch (err) {
                    console.error("Fetch error:", err);
                    alert("Server error");
                }
            }
        });
    });
});

