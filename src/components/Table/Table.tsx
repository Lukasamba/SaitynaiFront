import React from 'react';
import { Table as ReactstrapTable } from 'reactstrap';
import { MoviesListResponse } from '../../api/types/movies';
import { HallsListResponse } from '../../api/types/halls';
import { DivisionsListResponse } from '../../api/types/divisions';

export interface TableProps {
  names: string[];
  data: MoviesListResponse[] | HallsListResponse[] | DivisionsListResponse[];
}

const Table: React.FC<TableProps> = ({ names, data }) => {
  const renderTableHeader = () => {
    return names.map((value, index) => <th key={index}>{value}</th>);
  };

  const renderTableContent = () => {
    return data.map((value, index) => (
      <tr key={index}>
        {Object.values(value).map((v, i) => (
          <td key={i}>{v}</td>
        ))}
      </tr>
    ));
  };

  return (
    <ReactstrapTable hover>
      <thead>
        <tr>{renderTableHeader()}</tr>
      </thead>

      <tbody>{renderTableContent()}</tbody>
    </ReactstrapTable>
  );
};

export default Table;
