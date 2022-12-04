import React, { useCallback, useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { StyledInputBlock, StyledLabel } from '../../../auth/Login/Login.style';
import { Input } from 'reactstrap';
import { Modal } from '../../../../components/Modal';
import * as Yup from 'yup';
import { MovieCreateRequest } from '../../../../api/types/movies';
import { Api } from '../../../../api';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

const MovieCreateModal: React.FC<Props> = ({ isOpen, setOpen, toggle }) => {
  const MovieSchema = Yup.object().shape({
    name: Yup.string().required(),
    genre: Yup.string().required(),
    length: Yup.string().required(),
    image_url: Yup.string().required(),
  });

  const [movieRequest] = useState({
    name: '',
    genre: '',
    length: '',
    image_url: '',
  });

  const onSubmit = useCallback(
    async (request: MovieCreateRequest, helpers: FormikHelpers<MovieCreateRequest>) => {
      try {
        await Api.movies.create(request);
      } catch (e: any) {
        helpers.setErrors(e.response.errors);
      } finally {
        setOpen(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const formRef = useRef<any>();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal title={'Add Movie'} isOpen={isOpen} toggle={toggle} onSubmit={handleSubmit}>
      <Formik
        initialValues={movieRequest}
        validationSchema={MovieSchema}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <StyledInputBlock>
              <StyledLabel>Name</StyledLabel>
              <Input
                id={'name'}
                name={'name'}
                type={'text'}
                placeholder={"Please enter movie's name."}
                onChange={handleChange}
                value={values.name}
              />
            </StyledInputBlock>

            <StyledInputBlock>
              <StyledLabel>Genre</StyledLabel>
              <Input
                id={'genre'}
                name={'genre'}
                type={'text'}
                placeholder={"Please enter movie's genre."}
                onChange={handleChange}
                value={values.genre}
              />
            </StyledInputBlock>

            <StyledInputBlock>
              <StyledLabel>Length</StyledLabel>
              <Input
                id={'length'}
                name={'length'}
                type={'text'}
                placeholder={"Please enter movie's length."}
                onChange={handleChange}
                value={values.length}
              />
            </StyledInputBlock>

            <StyledInputBlock>
              <StyledLabel>Image URL</StyledLabel>
              <Input
                id={'image_url'}
                name={'image_url'}
                type={'text'}
                placeholder={"Please enter movie's image url."}
                onChange={handleChange}
                value={values.image_url}
              />
            </StyledInputBlock>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default MovieCreateModal;
