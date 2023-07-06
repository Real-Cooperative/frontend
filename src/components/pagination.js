import React from "react";

const Pagination = (props) => {
    const { page, limit, total } = props;
    const totalPages = Math.ceil(total / limit);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination-container">
            {page - 1 > 0 ? (
                <a href={`?page=${page - 1}&limit=${limit}`}>
                    <div className="pagination-button">
                        <p>Previous</p>
                    </div>
                </a>
            ) : (
                <div className="pagination-button disabled">
                    <p>Previous</p>
                </div>
            )}
            {pageNumbers.map((pageNumber, index) => {
                return pageNumber === page ? (
                    <div key={index} className="pagination-button disabled">
                        <p>{pageNumber}</p>
                    </div>
                ) : (
                    <a key={index} href={`?page=${pageNumber}&limit=${limit}`}>
                        <div className="pagination-button">
                            <p>{pageNumber}</p>
                        </div>
                    </a>
                );
            })}
            {page + 1 <= totalPages ? (
                <a href={`?page=${page + 1}&limit=${limit}`}>
                    <div className="pagination-button">
                        <p>Next</p>
                    </div>
                </a>
            ) : (
                <div className="pagination-button disabled">
                    <p>Next</p>
                </div>
            )}
        </div>
    );
};

export default Pagination;
