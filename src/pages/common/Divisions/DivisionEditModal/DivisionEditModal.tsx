import React, { useEffect, useRef, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { StyledInputBlock, StyledLabel } from '../../../auth/Login/Login.style';
import { Input } from 'reactstrap';
import { Modal } from '../../../../components/Modal';
import * as Yup from 'yup';
import { Api } from '../../../../api';
import { Spinner } from '../../../../components/Spinner';
import { DivisionUpdateRequest } from '../../../../api/types/divisions';

interface Props {
  currentItemId: number;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  render: () => void;
}

const DivisionEditModal: React.FC<Props> = ({ currentItemId, isOpen, setOpen, toggle, render }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const DivisionSchema = Yup.object().shape({
    address: Yup.string().required(),
    halls_count: Yup.number().required(),
  });

  const [divisionRequest, setDivisionRequest] = useState<DivisionUpdateRequest>({
    address: '',
    halls_count: 0,
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await Api.divisions.get(currentItemId);
        setDivisionRequest(response);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentItemId]);

  const onSubmit = async (
    request: DivisionUpdateRequest,
    helpers: FormikHelpers<DivisionUpdateRequest>,
  ) => {
    try {
      await Api.divisions.edit(currentItemId, request);
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
    <Modal title={'Edit Division'} isOpen={isOpen} toggle={toggle} onSubmit={handleSubmit}>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </Modal>
  );
};

export default DivisionEditModal;
