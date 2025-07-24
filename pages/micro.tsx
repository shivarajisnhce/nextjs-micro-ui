import dynamic from 'next/dynamic';
import React from 'react';

// Client-side only import
// const MicroApp = dynamic(
//   () => {
//     if (typeof window !== 'undefined') {
//       return import('micro_ui/App');
//     }
//     return Promise.resolve(() => <div>Loading...</div>);
//   },
//   {
//     ssr: false,
//     loading: () => <p>Loading Micro UI...</p>
//   }
// );

export default function MicroPage() {
  return (
    <div>
      <h1>Micro UI Page</h1>
      {/* <MicroApp /> */}
    </div>
  );
}