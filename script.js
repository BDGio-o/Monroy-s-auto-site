// 🌤️ Set background based on time of day
const currentHour = 14;
let timeClass = "morning";

if (currentHour >= 6 && currentHour < 12) {
  timeClass = "morning";
} else if (currentHour >= 12 && currentHour < 18) {
  timeClass = "afternoon";
} else if (currentHour >= 18 && currentHour < 21) {
  timeClass = "evening";
} else {
  timeClass = "night";
}

document.body.classList.add(timeClass);

// 🕒 Highlight today's hours and show open/closed status
document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const dayNames = [
    "sunday", "monday", "tuesday", "wednesday",
    "thursday", "friday", "saturday"
  ];

  const openHours = {
    monday: [8, 18],
    tuesday: [8, 18],
    wednesday: [8, 18],
    thursday: [8, 18],
    friday: [8, 18],
    saturday: [8, 15],
    sunday: null // Closed all day
  };

  const todayId = dayNames[dayIndex];
  const todayElement = document.getElementById(todayId);
  const shopStatus = document.getElementById("shop-status");

  // Highlight today's day in the hours list
  if (todayElement) {
    todayElement.style.backgroundColor = "#e63946";
    todayElement.style.color = "white";
    todayElement.style.fontWeight = "bold";
    todayElement.style.borderRadius = "8px";
    todayElement.style.paddingLeft = "10px";
  }

  // Format current time to 12-hour format
  const hour12 = hour % 12 || 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  const timeString = `${hour12}:${minutes} ${ampm}`;

  // Determine open/closed status
  let statusText = `Current time: ${timeString} — `;

  if (openHours[todayId]) {
    const [open, close] = openHours[todayId];
    statusText += (hour >= open && hour < close)
      ? "🟢 Open"
      : "🔴 Closed";
  } else {
    statusText += "🔴 Closed";
  }

  // Display status below the hours table
  if (shopStatus) {
    shopStatus.textContent = statusText;
    shopStatus.style.marginTop = "15px";
    shopStatus.style.fontWeight = "600";
    shopStatus.style.fontSize = "1.1rem";
  }
});
