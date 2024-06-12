import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div style={styles.loaderOverlay}>
      <TailSpin
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="loading"
      />
    </div>
  );
};

const styles = {
  loaderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ mờ nền
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Đảm bảo lớp phủ nằm trên tất cả các thành phần khác
  },
};

export default Loading;
