import Head from 'next/head'
import ImageGallery from 'react-image-gallery';
// import "./ImageBanner.scss"

export default function ImageBanner() {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <div className="container">
      <ImageGallery
        autoPlay
        className='carousel'
        useBrowserFullscreen
        items={images} 
        slideInterval={7000}
        thumbnailPosition='top'
        style={{
          overflowX: 'hidden',
          height: '100%',
          width: '100%'
        }}
      />
    </div>
  )
}
