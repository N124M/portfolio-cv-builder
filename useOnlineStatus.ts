import { useEffect, useState } from 'react';
import { storageService } from '../services/storageService';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [syncedCount, setSyncedCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Flush offline queue automatically when network comes back online
      const count = storageService.processPendingSyncQueue();
      if (count > 0) {
        setSyncedCount((prev) => prev + count);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, syncedCount };
}
