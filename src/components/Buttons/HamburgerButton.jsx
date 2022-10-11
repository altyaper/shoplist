import { Button } from '@mui/material';
import styled, { css } from 'styled-components';
import { styled as MUIStyled } from '@mui/material/styles';

const HamburgerButtonWrapper = MUIStyled(Button)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  right: '0px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'right'
}));

const Line = styled.span`
  height: 4px;
  border-radius: 5px;
  background: ${({ open }) => open ? 'white' : 'black' };
  margin-top: 8px;
  transition: all 0.5s ease;
  

  ${({ size }) => {
    switch(size) {
      case 's':
        return css`
          width: 20px;
          transform: translateX(${({ open }) => open ? '-17px' : '10px' });
        `;
      case 'm':
        return css`
          width: 25px;
          transform: translateX(${({ open }) => open ? '-17px' : '8px' });
        `;
      case 'l':
        return css`
          width: 30px;
          transform: translateX(${({ open }) => open ? '-17px' : '6px' });
        `;
    }
  }}
`;

export const HamburgerButton = (props) => {
  return (
    <HamburgerButtonWrapper {...props}>
      <Line size='s' open={props.open} />
      <Line size='m' open={props.open} />
      <Line size='l' open={props.open} />
    </HamburgerButtonWrapper>
  )
}

export default HamburgerButton;