import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { StyledInputBlock, StyledLabel } from '../../../auth/Login/Login.style';
import { Input } from 'reactstrap';
import { Modal } from '../../../../components/Modal';
import * as Yup from 'yup';
import { MovieUpdateRequest } from '../../../../api/types/movies';
import { Api } from '../../../../api';
import { Spinner } from '../../../../components/Spinner';

interface Props {
  currentItemId: number;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  render: () => void;
}

const MovieEditModal: React.FC<Props> = ({ currentItemId, isOpen, setOpen, toggle, render }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const MovieSchema = Yup.object().shape({
    name: Yup.string().required(),
    genre: Yup.string().required(),
    length: Yup.string().required(),
    image_url: Yup.string().required(),
  });

  const [movieRequest, setMovieRequest] = useState<MovieUpdateRequest>({
    name: '',
    genre: '',
    length: '',
    image_url: '',
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Api.movies.get(currentItemId);
        setMovieRequest(response);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentItemId]);

  const onSubmit = async (
    request: MovieUpdateRequest,
    helpers: FormikHelpers<MovieUpdateRequest>,
  ) => {
    try {
      await Api.movies.edit(currentItemId, request);
    } catch (e: any) {
      helpers.setErrors(e.response.errors);
    } finally {
      setOpen(false);
      render();
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const formRef = useRef<any>();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal title={'Edit Movie'} isOpen={isOpen} toggle={toggle} onSubmit={handleSubmit}>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </Modal>
  );
};

export default MovieEditModal;
