import { Button } from '@mui/material';
import styled, { css } from 'styled-components';
import { styled as MUIStyled } from '@mui/material/styles';
import { HamburgerButtonProps } from '../../models';

const HamburgerButtonWrapper = MUIStyled(Button)<HamburgerButtonProps>(() => ({
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'right'
}));

const Line = styled.span<HamburgerButtonProps>`
  height: 4px;
  border-radius: 5px;
  background: ${({ open }) => open ? 'gray' : 'black' };
  margin-top: 8px;
  transition: all 0.5s ease;
  

  ${({ lineSize }) => {
    switch(lineSize) {
      case 's':
        return css`
          width: 20px;
        `;
      case 'm':
        return css`
          width: 25px;
        `;
      case 'l':
        return css`
          width: 30px;
        `;
      default:
    }
  }}
`;

export const HamburgerButton = (props: HamburgerButtonProps) => {
  const { open, onClick, ...otherProps } = props;
  
  return (
    <HamburgerButtonWrapper 
      {...otherProps}
      onClick={onClick}
      aria-label={open ? "Close side menu" : "Open side menu"}
      aria-expanded={open}
      aria-controls="side-menu"
      aria-haspopup="true"
      title={open ? "Close side menu" : "Open side menu"}
    >
      <Line lineSize='s' open={open} />
      <Line lineSize='m' open={open} />
      <Line lineSize='l' open={open} />
      <span className="sr-only">
        {open ? "Close side menu" : "Open side menu"}
      </span>
    </HamburgerButtonWrapper>
  )
}

export default HamburgerButton;