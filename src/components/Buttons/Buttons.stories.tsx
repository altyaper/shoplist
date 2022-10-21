import { BaseButton } from "./Buttons";

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'BaseButton',
  component: BaseButton,
};

export const Primary = () => <BaseButton>Button</BaseButton>;