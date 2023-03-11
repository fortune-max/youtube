import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VideoPlayer from '../components/VideoPlayer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'YouTube/VideoPlayer',
  component: VideoPlayer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    videoId: { control: { type: "select", options: ["0PiqqbyQRoo", "yBLdQ1a4-JI"] } },
    autoplay: { control: { type: "select", options: [0, 1] } },

  },
} as ComponentMeta<typeof VideoPlayer>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof VideoPlayer> = (args) => <VideoPlayer {...args} videoId={args.videoId}/>;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  videoId: "0PiqqbyQRoo"
};

export const Secondary = Template.bind({});
Secondary.args = {
  videoId: "yBLdQ1a4-JI"
};
