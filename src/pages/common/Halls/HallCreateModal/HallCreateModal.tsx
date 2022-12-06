import React, { useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { StyledInputBlock, StyledLabel } from '../../../auth/Login/Login.style';
import { Input } from 'reactstrap';
import { Modal } from '../../../../components/Modal';
import * as Yup from 'yup';
import { Api } from '../../../../api';
import { HallCreateRequest } from '../../../../api/types/halls';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  render: () => void;
}

const HallCreateModal: React.FC<Props> = ({ isOpen, setOpen, toggle, render }) => {
  const HallSchema = Yup.object().shape({
    name: Yup.string().required(),
    seats_count: Yup.number().required(),
    division_id: Yup.number().required(),
  });

  const [hallRequest] = useState<HallCreateRequest>({
    name: '',
    seats_count: 0,
    division_id: 0,
  });

  const onSubmit = async (
    request: HallCreateRequest,
    helpers: FormikHelpers<HallCreateRequest>,
  ) => {
    try {
      await Api.halls.create(request);
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
    <Modal title={'Add Hall'} isOpen={isOpen} toggle={toggle} onSubmit={handleSubmit}>
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
    </Modal>
  );
};

export default HallCreateModal;
