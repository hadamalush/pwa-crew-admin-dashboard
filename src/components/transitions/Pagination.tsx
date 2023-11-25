import { cn } from "../../util/utils";
import Button from "../UI/Button";
import Icon from "../UI/Icons/Icon";
import { ComponentPropsWithoutRef } from "react";

type PaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  itemsAllAmount: number;
  onChangePage: React.Dispatch<React.SetStateAction<number>>;
} & ComponentPropsWithoutRef<"ul">;

type getNumberOfPageProps = {
  currentPage: number;
  indexInPag: number;
};

const Pagination = ({
  currentPage,
  itemsPerPage,
  itemsAllAmount,
  onChangePage,
  className,
  ...props
}: PaginationProps) => {
  const lastPage = Math.ceil(itemsAllAmount / itemsPerPage);

  const getNumberOfPage = ({
    currentPage,
    indexInPag,
  }: getNumberOfPageProps): number | undefined => {
    if ([1, 2].includes(currentPage) || (currentPage === 3 && lastPage === 3)) return indexInPag;
    else {
      switch (indexInPag) {
        case 1: {
          if (currentPage === lastPage) return currentPage - 2;
          return currentPage - 1;
        }
        case 2: {
          if (currentPage === lastPage) return currentPage - 1;
          return currentPage;
        }
        case 3: {
          if (currentPage === lastPage) return currentPage;
          return currentPage + 1;
        }
      }
    }
  };

  const firstIndexPag = getNumberOfPage({ currentPage: currentPage, indexInPag: 1 });
  const secondIndexPag = getNumberOfPage({ currentPage: currentPage, indexInPag: 2 });
  const thirdIndexPag = getNumberOfPage({ currentPage: currentPage, indexInPag: 3 });

  return (
    <>
      {lastPage > 1 && (
        <ul className={cn("flex items-center ", className)} {...props}>
          <li>
            <Button
              variant="outline"
              className="group p-2 md:p-5 outline-none order-1 md:order-none"
              aria-label="Previous page"
              type="button"
              onClick={() =>
                onChangePage((prev) => {
                  if (prev === 1) return prev;
                  return prev - 1;
                })
              }
            >
              <Icon
                iconName="arrowLeftMini"
                size="s1_5"
                color="gray"
                className="group-hover:text-lightBlue"
              />
            </Button>
          </li>
          <li>
            <Button
              variant="default"
              className={cn("h-12  py-2 px-3", { "bg-bluePurple": currentPage === firstIndexPag })}
            >
              {firstIndexPag}
            </Button>
          </li>
          <li>
            <Button
              variant="default"
              className={cn("h-12 mx-3 py-2 px-3", {
                "bg-bluePurple": currentPage === secondIndexPag,
                "mr-0": lastPage < 3,
              })}
            >
              {secondIndexPag}
            </Button>
          </li>
          {lastPage > 2 && (
            <li>
              <Button
                variant="default"
                className={cn("h-12  py-2 px-3", {
                  "bg-bluePurple": currentPage === thirdIndexPag,
                })}
              >
                {thirdIndexPag}
              </Button>
            </li>
          )}
          <li>
            <Button
              variant="outline"
              className="group p-2 md:p-5 outline-none order-1 md:order-none"
              aria-label="Next page"
              type="button"
              onClick={() =>
                onChangePage((prev) => {
                  if (prev === lastPage) return prev;
                  return prev + 1;
                })
              }
            >
              <Icon
                iconName="arrowRightMini"
                size="s1_5"
                color="gray"
                className="group-hover:text-lightBlue"
              />
            </Button>
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;
