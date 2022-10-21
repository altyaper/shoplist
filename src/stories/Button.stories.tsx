import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { withThemeProvider } from './decorators/ThemeProvider';
import { Button } from '@mui/material';
import { HamburgerButton } from '../components/Buttons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Theme/Button',
  component: Button,
  decorators: [withThemeProvider]
} as ComponentMeta<typeof Button>;

export const TextButton = () => <Button variant='text'>text</Button>;
export const ContainedButton = () => <Button variant='contained'>contained</Button>
export const OutlineButton = () => <Button variant='outlined'>Outlined</Button>
export const Hamburger = () => <HamburgerButton />
export const HamburgerOpen = () => <HamburgerButton open={true} />