document.getElementById("f").onsubmit = function() {
  // Perform any login validation if needed
  // Redirect to second.html
  window.location.href = "final.html";
  return false; // Prevent the form from submitting traditionally
};