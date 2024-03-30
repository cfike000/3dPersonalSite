import React, { useState, useEffect } from "react"

const LoadingOverlay = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Fade out the overlay after 2 seconds
    const timer = setTimeout(() => setIsVisible(false), 3000)
    console.log("fading")
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        transition: "opacity 2s ease-out",
        opacity: isVisible ? 1 : 0,
        pointerEvents: "none", // Allows clicks through the overlay after it's invisible
        zIndex: 1000,
        flexDirection: "column",
      }}
    >
      <div style={{ color: "white", marginBottom: "20px", fontSize: "2rem" }}>
        Loading...
      </div>
      <svg
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.0"
        width="64px"
        height="64px"
        viewBox="0 0 128 128"
        xmlSpace="preserve"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="#000000" />
        <g>
          <path d="M59.6 0h8v40h-8V0z" fill="#0d0d0d" />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#cfcfcf"
            transform="rotate(30 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#cfcfcf"
            transform="rotate(60 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#cfcfcf"
            transform="rotate(90 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#cfcfcf"
            transform="rotate(120 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#b6b6b6"
            transform="rotate(150 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#9e9e9e"
            transform="rotate(180 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#868686"
            transform="rotate(210 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#6e6e6e"
            transform="rotate(240 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#555555"
            transform="rotate(270 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#3d3d3d"
            transform="rotate(300 64 64)"
          />
          <path
            d="M59.6 0h8v40h-8V0z"
            fill="#252525"
            transform="rotate(330 64 64)"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64"
            calcMode="discrete"
            dur="1080ms"
            repeatCount="indefinite"
          ></animateTransform>
        </g>
      </svg>
    </div>
  )
}

export default LoadingOverlay
