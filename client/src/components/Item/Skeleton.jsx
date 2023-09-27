import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={355}
    height={410}
    viewBox="0 0 355 410"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="120" y="317" rx="0" ry="0" width="0" height="1" /> 
    <rect x="120" y="316" rx="0" ry="0" width="0" height="1" /> 
    <rect x="0" y="273" rx="7" ry="7" width="355" height="50" /> 
    <circle cx="176" cy="128" r="128" /> 
    <rect x="126" y="346" rx="7" ry="7" width="100" height="30" />
  </ContentLoader>
)

export default MyLoader
