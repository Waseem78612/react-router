import React from "react";

const LinkTest = () => {
  // Method 1: Using window.open in a function
  const handleButtonClick = () => {
    console.log("Button clicked - opening GitHub");
    window.open("https://github.com", "_blank");
  };

  // Method 2: Alternative using direct window.open
  const handleAlternativeClick = () => {
    const newWindow = window.open(
      "https://github.com",
      "_blank",
      "noopener,noreferrer",
    );
    if (newWindow) {
      newWindow.opener = null; // Security best practice
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#333" }}>Test Links in React</h1>

      {/* Method 1: Regular anchor tag - WORKS EXACTLY LIKE HTML */}
      <div style={{ margin: "20px 0" }}>
        <h3>Method 1: Regular Anchor Tag</h3>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "blue",
            textDecoration: "underline",
            fontSize: "18px",
          }}
        >
          Test GitHub Link (Same as HTML)
        </a>
        <p style={{ color: "#666" }}>
          This works exactly like your HTML anchor
        </p>
      </div>

      {/* Method 2: Button with onClick */}
      <div style={{ margin: "20px 0" }}>
        <h3>Method 2: Button with onClick</h3>
        <button
          onClick={handleButtonClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Test Button (window.open)
        </button>
        <p style={{ color: "#666" }}>
          Same as your HTML button but using React onClick
        </p>
      </div>

      {/* Method 3: Alternative approach */}
      <div style={{ margin: "20px 0" }}>
        <h3>Method 3: Alternative Button</h3>
        <button
          onClick={handleAlternativeClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Test Button (Alternative)
        </button>
      </div>
    </div>
  );
};

export default LinkTest;
