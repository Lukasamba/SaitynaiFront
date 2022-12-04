import React, { useState } from 'react';
import { Button, Table as ReactstrapTable } from 'reactstrap';
import { MoviesListResponse } from '../../api/types/movies';
import { HallsListResponse } from '../../api/types/halls';
import { DivisionsListResponse } from '../../api/types/divisions';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { Api } from '../../api';

export interface TableProps {
  names: string[];
  data: MoviesListResponse[] | HallsListResponse[] | DivisionsListResponse[];
  type: 'movie' | 'hall' | 'division';
}

const Table: React.FC<TableProps> = ({ names, data, type }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

  const renderTableHeader = () => {
    return names.map((value, index) => <th key={index}>{value}</th>);
  };

  const handleDelete = async (id: string) => {
    try {
      switch (type) {
        case 'movie': {
          await Api.movies.delete(id);
        }
      }
    } catch (e: any) {
      console.error(`error ${type} delete`);
    }
  };

  const renderButtons = (id: string) => {
    return (
      <>
        <Button color={'primary'}>Edit</Button>
        <Button color={'danger'} onClick={toggleDeleteModal}>
          Delete
        </Button>

        <ConfirmModal
          id={id}
          item={type}
          onSubmit={() => handleDelete(id)}
          toggle={toggleDeleteModal}
          isOpen={isDeleteModalOpen}
        />
      </>
    );
  };

  const renderTableContent = () => {
    return data.map((value, index) => (
      <tr key={index}>
        {Object.values(value).map((v, i) => (
          <td key={i}>{v}</td>
        ))}
        <td>{renderButtons(value.id)}</td>
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
