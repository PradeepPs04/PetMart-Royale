import React, { Fragment } from 'react'

// shadcn ui componenets
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationWrapper = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // scroll to top of screen
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  // go to previous page
  const handlePrevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  }

  // go to next page
  const handleNextPage = () => {
    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className='cursor-pointer'>
          <PaginationPrevious onClick={handlePrevPage}/>
        </PaginationItem>

        {/* pagination numbers */}
        <Fragment>  
          {
            [...Array(totalPages)].map((_, idx) => (
              <PaginationItem 
                key={idx}
                onClick={() => {
                  setCurrentPage(idx+1);
                  scrollToTop();
                }}
                className={`
                  cursor-pointer rounded
                  ${idx+1 === currentPage ? 'outline' : ''}
                `}
              >
                <PaginationLink>
                  {idx+1}
                </PaginationLink>
              </PaginationItem>
            ))
          }
        </Fragment>

        <PaginationItem className='cursor-pointer'>
          <PaginationNext onClick={handleNextPage}/>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

export default PaginationWrapper

