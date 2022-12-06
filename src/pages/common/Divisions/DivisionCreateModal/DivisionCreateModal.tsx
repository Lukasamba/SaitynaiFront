import React, { useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { StyledInputBlock, StyledLabel } from '../../../auth/Login/Login.style';
import { Input } from 'reactstrap';
import { Modal } from '../../../../components/Modal';
import * as Yup from 'yup';
import { Api } from '../../../../api';
import { DivisionCreateRequest } from '../../../../api/types/divisions';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  render: () => void;
}

const DivisionCreateModal: React.FC<Props> = ({ isOpen, setOpen, toggle, render }) => {
  const DivisionSchema = Yup.object().shape({
    address: Yup.string().required(),
    halls_count: Yup.number().required(),
  });

  const [divisionRequest] = useState<DivisionCreateRequest>({
    address: '',
    halls_count: 0,
  });

  const onSubmit = async (
    request: DivisionCreateRequest,
    helpers: FormikHelpers<DivisionCreateRequest>,
  ) => {
    try {
      await Api.divisions.create(request);
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
    <Modal title={'Add Division'} isOpen={isOpen} toggle={toggle} onSubmit={handleSubmit}>
      <Formik
        initialValues={divisionRequest}
        validationSchema={DivisionSchema}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <StyledInputBlock>
              <StyledLabel>Address</StyledLabel>
              <Input
                id={'address'}
                name={'address'}
                type={'text'}
                placeholder={"Please enter division's address."}
                onChange={handleChange}
                value={values.address}
              />
            </StyledInputBlock>

            <StyledInputBlock>
              <StyledLabel>Halls count</StyledLabel>
              <Input
                id={'halls_count'}
                name={'halls_count'}
                type={'number'}
                placeholder={'Please enter halls count.'}
                onChange={handleChange}
                value={values.halls_count}
              />
            </StyledInputBlock>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default DivisionCreateModal;
