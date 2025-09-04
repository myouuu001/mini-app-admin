import React from "react";
import { PropTypes } from "prop-types";
import "./index.less";

const PanThumb = (props) => {
  const { image, zIndex, width, height, className } = props;
  
  // 如果没有图片，显示默认占位符
  if (!image) {
    return (
      <div
        className={`pan-item ${className}`}
        style={{ zIndex, height, width }}
      >
        <div className="pan-info">
          <div className="pan-info-roles-container">{props.children}</div>
        </div>
        <div className="pan-thumb" style={{ backgroundColor: '#f0f0f0' }} />
      </div>
    );
  }

  return (
    <div
      className={`pan-item ${className}`}
      style={{ zIndex, height, width }}
    >
      <div className="pan-info">
        <div className="pan-info-roles-container">{props.children}</div>
      </div>
      <img src={image} className="pan-thumb" alt="" />
    </div>
  );
};

PanThumb.propTypes = {
  image: PropTypes.string, // 移除 isRequired
  zIndex: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

PanThumb.defaultProps = {
  width: "150px",
  height: "150px",
  zIndex: 1,
  className: "",
  image: "", // 添加默认值
};

export default PanThumb;
