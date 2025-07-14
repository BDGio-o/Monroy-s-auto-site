// Detect time of day and apply gradient background
const hour = new Date().getHours();
let timeClass = "morning";

if (hour >= 6 && hour < 12) {
  timeClass = "morning";
} else if (hour >= 12 && hour < 18) {
  timeClass = "afternoon";
} else if (hour >= 18 && hour < 21) {
  timeClass = "evening";
} else {
  timeClass = "night";
}

document.body.classList.add(timeClass);

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const dayIndex = now.getDay(); // Sunday = 0, Monday = 1, etc.
  const hours = now.getHours();
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
    sunday: null // closed
  };

  const todayId = dayNames[dayIndex];
  const todayItem = document.getElementById(todayId);
  const shopStatus = document.getElementById("shop-status");

  if (todayItem) {
    todayItem.style.backgroundColor = "#e63946";
    todayItem.style.color = "white";
    todayItem.style.fontWeight = "bold";
    todayItem.style.borderRadius = "8px";
    todayItem.style.paddingLeft = "10px";
  }

  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const timeString = `${hour12}:${minutes} ${ampm}`;

  let statusText = `Current time: ${timeString} — `;

  if (openHours[todayId]) {
    const [open, close] = openHours[todayId];
    statusText += (hours >= open && hours < close)
      ? "🟢 Open"
      : "🔴 Closed";
  } else {
    statusText += "🔴 Closed";
  }

  if (shopStatus) {
    shopStatus.textContent = statusText;
    shopStatus.style.marginTop = "15px";
    shopStatus.style.fontWeight = "600";
    shopStatus.style.fontSize = "1.1rem";
  }
});
