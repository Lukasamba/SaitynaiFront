import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { StyledInputBlock, StyledLabel } from '../../../auth/Login/Login.style';
import { Input } from 'reactstrap';
import { Modal } from '../../../../components/Modal';
import * as Yup from 'yup';
import { Api } from '../../../../api';
import { Spinner } from '../../../../components/Spinner';
import { HallUpdateRequest } from '../../../../api/types/halls';

interface Props {
  currentItemId: number;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  render: () => void;
}

const HallEditModal: React.FC<Props> = ({ currentItemId, isOpen, setOpen, toggle, render }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const HallSchema = Yup.object().shape({
    name: Yup.string().required(),
    seats_count: Yup.number().required(),
    division_id: Yup.number().required(),
  });

  const [hallRequest, setHallRequest] = useState<HallUpdateRequest>({
    name: '',
    seats_count: 0,
    division_id: 0,
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Api.halls.get(currentItemId);
        setHallRequest(response);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentItemId]);

  const onSubmit = async (
    request: HallUpdateRequest,
    helpers: FormikHelpers<HallUpdateRequest>,
  ) => {
    try {
      await Api.halls.edit(currentItemId, request);
    } catch (e: any) {
      helpers.setErrors(e.response.errors);
    } finally {
      setOpen(false);
      render();
    }
  };

  const formRef = useRef<any>();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal title={'Edit Hall'} isOpen={isOpen} toggle={toggle} onSubmit={handleSubmit}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={hallRequest}
          validationSchema={HallSchema}
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
                  placeholder={"Please enter hall's name."}
                  onChange={handleChange}
                  value={values.name}
                />
              </StyledInputBlock>

              <StyledInputBlock>
                <StyledLabel>Seats count</StyledLabel>
                <Input
                  id={'seats_count'}
                  name={'seats_count'}
                  type={'number'}
                  placeholder={'Please enter seats count.'}
                  onChange={handleChange}
                  value={values.seats_count}
                />
              </StyledInputBlock>

              <StyledInputBlock>
                <StyledLabel>Division ID</StyledLabel>
                <Input
                  id={'division_id'}
                  name={'division_id'}
                  type={'number'}
                  placeholder={"Please enter division's id."}
                  onChange={handleChange}
                  value={values.division_id}
                />
              </StyledInputBlock>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default HallEditModal;
