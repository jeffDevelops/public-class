import React from 'react'
import { Story, Meta } from '@storybook/react'
import TextButton, { Props } from '../_components/TextButton/TextButton'
import { WithRenderContext } from './utils/WithRenderContext'

export default {
  title: 'TextButton',
  component: TextButton,
  argTypes: {},
}

const Template: Story<Props> = props => WithRenderContext(props)(TextButton)

export const Primary = Template.bind({})
Primary.args = {
  children: 'Click Me',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Click Me',
  color: 'secondary',
}

export const Warning = Template.bind({})
Warning.args = {
  children: 'This could have grave repercussions',
  color: 'warning',
}

export const Danger = Template.bind({})
Danger.args = {
  children: "I sure hope you know what you're doing",
  color: 'danger',
}

export const WithoutBackground = Template.bind({})
WithoutBackground.args = {
  children: "I'm very link-esque",
  color: 'primary',
  disableBackground: true,
}

export const AsLink = Template.bind({})
AsLink.args = {
  children: "I'm literally a link",
  asLinkTo: 'https://www.google.com',
}

export const AsLinkWithoutBackground = Template.bind({})
AsLinkWithoutBackground.args = {
  children: "I'm literally a link, too",
  asLinkTo: 'https://www.google.com',
  disableBackground: true,
}
