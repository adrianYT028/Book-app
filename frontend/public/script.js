// Mario-themed Book Library Script 🍄
document.addEventListener("DOMContentLoaded", () => {
    console.log("🎮 Mario's Library is ready for adventure!"); 

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            console.log("🗑️ Remove power-up clicked!"); 

            const bookId = button.getAttribute("data-id");
            if (!bookId) {
                console.error("❌ No power-up ID found!");
                return;
            }

            if (confirm("🍄 Are you sure you want to remove this power-up from your collection? This action cannot be undone! 😱")) {
                try {
                    const res = await fetch(`/books/${bookId}`, { 
                        method: "DELETE" 
                    });

                    console.log("🚀 Server response:", res.status); 

                    if (res.ok) {
                        // Add a fun Mario-style animation before removing
                        const bookCard = document.getElementById(`book-${bookId}`);
                        bookCard.style.transform = "scale(0.8) rotate(10deg)";
                        bookCard.style.opacity = "0.5";
                        
                        setTimeout(() => {
                            bookCard.remove();
                            console.log("✨ Power-up removed successfully! Mama mia!");
                        }, 300);
                    } else {
                        alert("❌ Oops! Couldn't remove the power-up. Try again!");
                    }
                } catch (err) {
                    console.error("💥 Fetch error:", err);
                    alert("🚨 Server error! Mario needs to check the pipes!");
                }
            }
        });
    });
});

