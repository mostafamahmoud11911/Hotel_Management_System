import React, { useCallback, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { api } from '../../../utils/custom';
import { Ads } from '../../../types/types';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react'


function ViewModal({ isOpen, handleClose, adId }: { isOpen: boolean, handleClose: () => void, adId: string }) {


  const [ad, setAd] = useState<Ads | null>(null);
  const [loading, setLoading] = useState(false);


  const getAdsDetails = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/admin/ads/${adId}`);
      setAd(data.data.ads);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err?.response?.data?.message || err.message ||
        'An unexpected error occurred');
    } finally {
      setLoading(false)
    }
  }, [adId])

  useEffect(() => {
    if (adId && isOpen) {
      getAdsDetails()
    }
  }, [adId, getAdsDetails, isOpen])


  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="room-details-dialog"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="room-details-dialog" sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 2,
          mb: 2,
          fontSize: '1.2rem',
          fontWeight: 'medium'
        }}>
          AD Details
        </DialogTitle>
        {loading ? <AdsDetailsSkeleton /> : <DialogContent sx={{ py: 3 }}>
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" sx={{
              fontWeight: 'medium',
              color: 'text.secondary',
              mb: 0.5
            }}>
              Room Name
            </Typography>
            <Typography variant="body1">{ad?.room.roomNumber || 'Not specified'}</Typography>
          </Box>

          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" sx={{
              fontWeight: 'medium',
              color: 'text.secondary',
              mb: 0.5
            }}>
              Created By:
            </Typography>
            <Typography variant="body1">{ad?.createdBy.userName || 'Not specified'}</Typography>
          </Box>

          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" sx={{
              fontWeight: 'medium',
              color: 'text.secondary',
              mb: 0.5
            }}>
              Is Active:
            </Typography>
            <Typography variant="body1">
              {ad?.isActive ? 'Active' : 'Not Active'}
            </Typography>
          </Box>
          <Box sx={{ mb: 1, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" sx={{
              fontWeight: 'medium',
              color: 'text.secondary',
              mb: 0.5
            }}>
              Created At:
            </Typography>
            <Typography variant="body1">
              {ad?.createdAt ? new Date(ad.createdAt).toLocaleDateString("en-US") : 'Unknown date'}
            </Typography>
          </Box>
        </DialogContent>}

      </Dialog>
    </React.Fragment>
  );
}



const AdsDetailsSkeleton = () => {
  // Animation variants for the skeleton
  const skeletonVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <DialogContent sx={{ py: 3 }}>
      {/* Name Skeleton */}
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 0.5 }}>
          Name
        </Typography>
        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          style={{
            width: '150px',
            height: '24px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px'
          }}
        />
      </Box>

      {/* Created At Skeleton */}
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 0.5 }}>
          Created At:
        </Typography>
        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          style={{
            width: '200px',
            height: '24px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px'
          }}
        />
      </Box>

      {/* Updated At Skeleton */}
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 0.5 }}>
          Updated At:
        </Typography>
        <motion.div
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          style={{
            width: '200px',
            height: '24px',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px'
          }}
        />
      </Box>
    </DialogContent>
  );
};



export default React.memo(ViewModal);