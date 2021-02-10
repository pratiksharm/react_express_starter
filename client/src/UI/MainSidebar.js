import React from 'react';

import { Avatar, Button, Box, grommet, Grommet, Nav, Sidebar, Anchor } from 'grommet';

import {
  Analytics,
  Chat,
  Clock,
  Configure,
  Help,
  Link,
  Projects,
  StatusInfoSmall,
} from 'grommet-icons';

const SidebarHeader = () => (
  <Avatar
    border={{ size: 'small', color: 'accent-2' }}
    background="white"
    flex={false}
  >
    SY
  </Avatar>
);

const SidebarFooter = () => (
  <Nav gap="small">
    <Button icon={<Chat />} />
    <Button icon={<Help />} />
  </Nav>
);

const MainNavigation = () => (
  <Nav gap="small">
    <Button icon={<StatusInfoSmall />} />
    <Button icon={<Projects />} />
    <Button icon={<Clock />} />
    <Box pad="small" border={{ color: 'white', side: 'bottom' }} />
    <Box gap="small" pad={{ vertical: 'medium' }}>
      <Button icon={<Analytics />} />
      <Button icon={<Configure />} />
    </Box>
  </Nav>
);

export const SidebarIcons = () => (
  <Grommet  full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        background="accent-1"
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
      >
        <MainNavigation />
      </Sidebar>
    </Box>
  </Grommet>
);

SidebarIcons.story = {
  name: 'Icons',
};

const MainSidebar = () => {
    return (
      <Sidebar background="light-2" round="xsmall"  height={"min: '100%'"} direction="column" fill="vertical"
      width="xsmall" pad="small" height="large" alignContent="center"
        header={
        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" alignSelf="center" />
        }
        footer={
        <Button icon={<Help />} hoverIndicator alignSelf="center" />
        }
        >
        <Link to="/form">
          <Anchor icon={<Projects />} alignSelf="center" />
        </Link>
        <Link to="/dashboard">
          <Anchor icon={<Clock />}   alignSelf="center"/>
        </Link>
        </Sidebar>

    )
}
export default MainSidebar;