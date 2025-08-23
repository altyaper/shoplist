import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useSession from '../../app/hooks/sessionHook';
import { Delete, Share } from '@mui/icons-material';
import { DeleteButton, HamburgerButton, ShareButton } from '../Buttons';
import { useTranslation } from 'react-i18next';
import { BlackSideProps } from '../../models';
import { Box, Container, Grid } from '@mui/material';

const BlackSide = styled.div<BlackSideProps>`
  border-left: 1px solid #efefef;
  background-color: #fdfdfd;
  width: 100px;
  text-align: center;
  position: fixed;
  right: ${({ sideOpen }) => sideOpen ? '0' : '-100px' };
  height: 100%;
  z-index: 1;
  top: 0;
  padding: ${({ sideOpen }) => sideOpen ? '100px 5px 0 5px' : '100px 0 0 0'};
  transition: all 0.5s ease;

  button {
    margin-bottom: 0.8em;
  }
`;

const SideMenuWrapper = styled.div`
  padding: 1.2em 0;
`;

export const SideMenu = () => {
  const { t } = useTranslation();
  const { onDeleteAll, tasks } = useSession();
  const [sideOpen, setSideOpen] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target as Node)) {
        setSideOpen(false);
      }
    };

    if (sideOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sideOpen]);

  const handleToggleSideBar = () => {
    setSideOpen(prev => !prev);
  }

  const handleCleanSession = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(t('delete_confirm_message'))) {
      onDeleteAll();
      setSideOpen(false);
    }
  }

  const handleShareList = async () => {
    // Get only pending (not completed) tasks
    const pendingTasks = tasks.filter(task => !task.done);
    
    if (pendingTasks.length === 0) {
      alert(t('no_pending_items') || 'No pending items to share');
      return;
    }

    // Create the text to share
    const listText = pendingTasks.map((task, index) => `${index + 1}. ${task.text}`).join('\n');
    const shareText = `${t('shopping_list') || 'Shopping List'}:\n\n${listText}`;

    // Use Web Share API if available, otherwise fallback to clipboard
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('shopping_list') || 'Shopping List',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to clipboard
        copyToClipboard(shareText);
      }
    } else {
      // Fallback to clipboard
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(t('list_copied') || 'List copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(t('list_copied') || 'List copied to clipboard!');
    }
  };

  return (
    <SideMenuWrapper>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <HamburgerButton open={sideOpen} onClick={handleToggleSideBar} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <BlackSide ref={sideMenuRef} id="side-menu" sideOpen={sideOpen}>
        <ShareButton
          onClick={handleShareList}
          aria-label={t('share_list_aria') || 'Share shopping list'}
          title={t('share_list_aria') || 'Share shopping list'}
        >
          <Share />
        </ShareButton>
        <DeleteButton
          onClick={handleCleanSession}
          aria-label={t('delete_all_aria') || 'Delete all tasks'}
          title={t('delete_all_aria') || 'Delete all tasks'}
        >
          <Delete />
        </DeleteButton>
      </BlackSide>
    </SideMenuWrapper>
  )
};

export default SideMenu;