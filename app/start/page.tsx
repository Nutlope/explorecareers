'use client';

import { UrlBuilder } from '@bytescale/sdk';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { useState } from 'react';

const options = {
  apiKey: !!process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    ? process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    : 'free',
  maxFileCount: 1,
  mimeTypes: ['application/pdf'],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: '#000',
    },
  },
};

export default function Start() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [parsedResume, setParsedResume] = useState('');

  console.log({ name, url, parsedResume });

  async function parsePdf() {
    let response = await fetch('/api/parsePdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeUrl: url }),
    });
    let data = await response.json();
    setParsedResume(data.normalizedText);
  }

  return (
    <div className='p-10 mt-20 flex justify-center items-center flex-col'>
      <h1 className='text-center text-4xl mb-5 font-bold'>
        Upload your resume
      </h1>
      <UploadDropzone
        options={options}
        onUpdate={({ uploadedFiles }) => {
          if (uploadedFiles.length !== 0) {
            const file = uploadedFiles[0];
            const fileName = file.originalFile.file.name;
            const fileUrl = UrlBuilder.url({
              accountId: file.accountId,
              filePath: file.filePath,
            });
            setName(fileName);
            setUrl(fileUrl);
          }
        }}
        onComplete={parsePdf}
        width='670px'
        height='350px'
      />
    </div>
  );
}
