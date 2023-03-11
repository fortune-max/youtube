import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VideoCardItem from './VideoCardItem';
import sampleVideos from '../videos';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'YouTube/VideoCardItem',
  component: VideoCardItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    video: { control: { type: "select", options: [] } }
  },
} as ComponentMeta<typeof VideoCardItem>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VideoCardItem> = (args) => <VideoCardItem {...args} video={args.video} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  video: sampleVideos[0]
};

export const Secondary = Template.bind({});
Secondary.args = {
  video: sampleVideos[1]
};
