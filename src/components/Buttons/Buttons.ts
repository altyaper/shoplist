import styled from 'styled-components';
import { Button } from '@mui/material';

export const BaseButton = styled(Button)(({ theme }) => ({
  height: '2.3em',
  width: '85%',
  borderRadius: '15px !important',
  color: 'white !important',
  fontSize: '2em !important',
  position: 'relative',
  zIndex: 2,
  boxShadow: '0px 3px 0px #000',
  marginBottom: '0.8em',
}));

export const DeleteButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: '#F43E32 !important',
}));

export const AddButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: '#343A43 !important',
}));