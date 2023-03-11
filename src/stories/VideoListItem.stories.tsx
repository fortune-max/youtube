import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VideoListItem from './VideoListItem';
import sampleVideos from '../videos';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'YouTube/VideoListItem',
  component: VideoListItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    video: { control: { type: "select", options: [] } }
  },
} as ComponentMeta<typeof VideoListItem>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VideoListItem> = (args) => <VideoListItem {...args} video={args.video} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  video: sampleVideos[0]
};

export const Secondary = Template.bind({});
Secondary.args = {
  video: sampleVideos[1]
};
