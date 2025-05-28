import React from "react";

// shadcn ui comnponents
import { Button } from "@/components/ui/button";
import {
    Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrdersSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] w-full">
        <div className="p-6 h-full w-full bg-gray-200 rounded-xl">
          {/* heading */}
          <h2 className="h-6 w-24 bg-gray-300 rounded"></h2>

          {/* orders table */}
          <Table className='mt-6'>
            <TableHeader>
              <TableRow>
                <TableHead>
                    <span className="bg-gray-300 inline-block h-6 w-15 rounded"></span>
                </TableHead>

                <TableHead>
                    <span className="bg-gray-300 inline-block h-6 w-[4.6rem] rounded"></span>
                </TableHead>

                <TableHead>
                    <span className="bg-gray-300 inline-block h-6 w-[5rem] rounded"></span>
                </TableHead>

                <TableHead>
                    <span className="bg-gray-300 inline-block h-6 w-[4.6rem] rounded"></span>
                </TableHead>

                <TableHead>
                  <span className="sr-only"></span>
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* list of orders */}
            {
                Array(3).fill().map((_, idx) => (
                    <TableBody key={idx}>
                    <TableRow>
                        <TableCell>
                            <span className="inline-block h-6 w-44 bg-gray-300 rounded"></span>
                        </TableCell>

                        <TableCell>
                            <span className="inline-block h-6 w-[4.7rem] bg-gray-300 rounded"></span>
                        </TableCell>

                        <TableCell>
                        <span className="inline-block h-6 w-16 bg-gray-300 rounded"></span>
                        </TableCell>

                        <TableCell>
                            <span className="inline-block h-6 w-10 rounded bg-gray-300"></span>
                        </TableCell>

                        {/* view details button */}
                        <TableCell>
                        <Button className='w-[6.8rem] bg-gray-300'></Button>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                ))
            }

          </Table>
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;
