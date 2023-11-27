import React from "react";
import { useQuery } from "react-query";
import classes from "./tc.module.scss";
import { getTupleCount } from "../../service/TupleCounts";

const TupleCountsPage = () => {
  const { data, isLoading, isError } = useQuery("tupleCounts", getTupleCount);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const tableRows = data.slice(0, -1).map((entry, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{entry.TABLE_NAME}</td>
      <td>{entry.TABLE_COUNT}</td>
    </tr>
  ));

  const totalCountRow = (
    <tr key="total">
      <td colSpan="2">{data[data.length - 1].TOTAL_COUNT}</td>
      <td>{data[data.length - 1].SUM}</td>
    </tr>
  );

  return (
    <div className={classes.tupleCountsContaint}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Table Name</th>
            <th>Table Count</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
          {totalCountRow}
        </tbody>
      </table>
    </div>
  );
};

export default TupleCountsPage;
