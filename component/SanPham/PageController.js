import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PageController = ({
  trangHienTai,
  paginate,
  products,
  sanPhamTrenMotTrang,
}) => {
  const handleLeftPage = () => {
    paginate(trangHienTai - 1);
    scrollToTop();
  };

  const handleRightPage = () => {
    paginate(trangHienTai + 1);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-controller">
      {trangHienTai > 1 && (
        <FontAwesomeIcon
          className="btn-page-arrow"
          icon={faArrowLeft}
          onClick={handleLeftPage}
        />
      )}
      {Array.from(
        { length: Math.ceil(products.length / sanPhamTrenMotTrang) },
        (_, index) => (
          <button
            className={`btn-page ${index + 1 === trangHienTai ? "active" : ""}`}
            key={index}
            onClick={() => {
              paginate(index + 1);
              scrollToTop();
            }}
          >
            {index + 1}
          </button>
        )
      )}

      {trangHienTai !== Math.ceil(products.length / sanPhamTrenMotTrang) && (
        <FontAwesomeIcon
          className="btn-page-arrow"
          icon={faArrowRight}
          onClick={handleRightPage}
        />
      )}
    </div>
  );
};

export default PageController;
